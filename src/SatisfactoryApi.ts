import {MinimumPrivilegeLevel} from "./Interfaces/MinimumPrivilegeLevel";
import {AdvancedGameSettings, AdvancedGameSettingsToDict} from "./Interfaces/AdvancedGameSettings";
import {Response} from "./Interfaces/Response";
import {ServerOptions, serverOptionsToDict} from "./Interfaces/ServerOptions";
import {NewGameData} from "./Interfaces/NewGameData";
import {APIError} from "./exceptions/APIError";
import https from 'https';
import fetch from 'node-fetch';

import fs from 'fs';
import path from 'path';
import {SatisfactoryApiOptions} from "./Interfaces/SatisfactoryApiOptions";

/**
 * Main API client for interacting with a Satisfactory Dedicated Server.
 *
 * Provides methods to manage server options, create or load games, query server state,
 * perform authentication, and run commands. Supports secure HTTPS communication
 * with optional SSL certificate initialization.
 *
 * @example
 * ```ts
 * const api = new SatisfactoryApi("127.0.0.1", 7777, { disableSSL: false });
 * await api.initCertificate();
 * const health = await api.healthCheck();
 * console.log(health.success); // true if server is reachable
 * ```
 */
export class SatisfactoryApi {
    host: string;
    port: number;
    authToken?: string;
    options?: SatisfactoryApiOptions;
    private httpsAgent?: https.Agent

    /**
     * Creates a new API client instance.
     *
     * @param host - The server hostname or IP address.
     * @param port - The server port (default 7777).
     * @param options - Optional configuration for the client.
     * @param authToken - Optional authentication token for API access.
     */
    constructor(host: string, port = 7777, options?: SatisfactoryApiOptions, authToken?: string) {
        this.host = host;
        this.port = port;
        this.authToken = authToken;
        this.options = options || {};
    }

    /**
     * Fetches and trusts the server SSL certificate on initialization.
     *
     * This method must be called before making API requests if SSL verification
     * is enabled. It saves the certificate locally and sets up the HTTPS agent.
     *
     * @throws {Error} If the certificate cannot be fetched or written.
     *
     * @example
     * ```ts
     * await api.initCertificate();
     * ```
     */    public async initCertificate() {
        const agent = new https.Agent({ rejectUnauthorized: false });
        if (!fs.existsSync(path.join(__dirname, '/certs'))) {
            fs.mkdirSync(path.join(__dirname, '/certs'));
        }

        const certPath = path.join(__dirname, `/certs/${this.host.replace(/\./g, '_')}_${this.port}.crt`);

        // Fetch the certificate
        const cert = await new Promise<import("tls").PeerCertificate>((resolve, reject) => {
            const req = https.request({ hostname: this.host, port: this.port, method: "GET", agent }, (res) => {
                const tlsSocket = res.socket as import("tls").TLSSocket;
                resolve(tlsSocket.getPeerCertificate());
            });
            req.on("error", reject);
            req.end();
        });

        // Convert certificate to PEM
        const pem = cert.raw.toString("base64").match(/.{1,64}/g)?.join("\n");
        const pemCert = `-----BEGIN CERTIFICATE-----\n${pem}\n-----END CERTIFICATE-----\n`;

        // Save PEM file if not exists
        if (!fs.existsSync(certPath)) {
            fs.writeFileSync(certPath, pemCert);
            console.log("Certificate saved to", certPath);
        }

        this.httpsAgent = new https.Agent({
            rejectUnauthorized: !(this.options?.skipSSLVerification ?? false),
            ca: fs.readFileSync(certPath), // now Node can validate it
        });
    }

    /**
     * Performs a low-level POST request to the server API.
     *
     * @param functionName - The API function name to call.
     * @param data - Optional data payload for the request.
     * @param timeout - Request timeout in milliseconds (default 10000ms).
     * @param files - Optional FormData for file uploads.
     * @returns The raw response from the API.
     * @throws {Error} If the HTTPS agent is not initialized or if the API responds with an error.
     */
    private async post(functionName: string, data?: any, timeout = 10000, files?: FormData): Promise<any> {
        if (!this.httpsAgent) throw new Error("HTTPS agent not initialized. Call initCertificate first.");

        const url = `https://${this.host}:${this.port}/api/v1`;
        const headers: Record<string, string> = {};

        if (files) {
            // FormData
            if (this.authToken) headers["Authorization"] = `Bearer ${this.authToken}`;
        } else {
            headers["Content-Type"] = "application/json";
            if (this.authToken) headers["Authorization"] = `Bearer ${this.authToken}`;
            data = data ? {function: functionName, data} : {function: functionName};
        }

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: files ? files as any : JSON.stringify(data),
                agent: this.httpsAgent,
                signal: controller.signal,
            });

            clearTimeout(id);

            if (response.status !== 200 && response.status !== 204) {
                const errorText = await response.text();
                throw new APIError(`API_ERROR_${response.status}`, `API error: ${errorText || "Unknown"}`);
            }

            if (response.status === 204) return {};

            const contentType = response.headers.get("Content-Type") ?? "";

            if (contentType.includes("application/json")) {
                const json: any = await response.json();
                if (json.errorCode) throw new APIError(json.errorMessage || "API error", json.errorCode);
                return json.data;
            } else if (contentType.includes("application/octet-stream")) {
                return await response.arrayBuffer();
            } else {
                return await response.text();
            }
        } finally {
            clearTimeout(id);
        }
    }

    /**
     * Performs a health check on the server.
     *
     * @param clientCustomData - Optional client data to include in the request.
     * @param retries - Number of retries if the health check fails (default 3).
     * @returns An object indicating success and optional server response data.
     *
     * @example
     * ```ts
     * const health = await api.healthCheck();
     * if (health.success) console.log("Server is healthy");
     * ```
     */
    async healthCheck(clientCustomData: string = '', retries: number = 3): Promise<{ success: boolean; data?: any; message?: string }> {
        /**
         * Perform a health check on the Satisfactory Dedicated Server API.
         * This method sends a POST request to the 'HealthCheck' endpoint with optional client custom data (mostly not required).
         *
         * @param {string} [clientCustomData=''] - Optional custom data to send with the health check request.
         * @param {number} [retries=3] - Number of retries for the health check in case of failure.
         *
         * Note: The more retries you set, the longer the health check will take to complete.
         * Every retry will increase the timeout by 1000ms (1 second).
         */
        for (let i = 0; i < retries; i++) {
            try {
                const baseTimeout = this.options?.healthCheckTimeout || 1000;
                const timeout = baseTimeout + i * 1000; // 1000, 2000, 3000, ...
                // Attempt health check
                const response = await this.post('HealthCheck', { ClientCustomData: clientCustomData }, timeout);
                return { success: true, data: response };
            } catch (err: any) {
                if (i === retries - 1) {
                    return { success: false, message: `Health check failed after ${retries} attempts: ${err.message}` };
                }
            }
        }

        return { success: false, message: 'Health check failed' };
    }

    /**
     * Verifies that the stored authentication token is valid.
     *
     * @returns A `Response` object confirming token validity.
     * @throws {APIError} If the API responds with an error.
     */
    async verifyAuthenticationToken(): Promise<Response> {
        await this.post('VerifyAuthenticationToken');
        return { success: true, data: { message: 'Token is valid' } };
    }

    /**
     * Performs a passwordless login with a given minimum privilege level.
     *
     * @param minimumPrivilegeLevel - The minimum privilege required.
     * @returns A `Response` indicating successful login and stores the token.
     */
    async passwordlessLogin(minimumPrivilegeLevel: MinimumPrivilegeLevel): Promise<Response> {
        const response = await this.post('PasswordlessLogin', {
            MinimumPrivilegeLevel: minimumPrivilegeLevel,
        });
        this.authToken = response.authenticationToken;
        return { success: true, data: { message: 'Successfully logged in, the token is now stored' } };
    }

    /**
     * Performs a password login with a given minimum privilege level.
     *
     * @param minimumPrivilegeLevel - The minimum privilege required.
     * @param password - The password to authenticate with.
     * @returns A `Response` indicating successful login and stores the token.
     */
    async passwordLogin(minimumPrivilegeLevel: MinimumPrivilegeLevel, password: string): Promise<Response> {
        const response = await this.post('PasswordLogin', {
            MinimumPrivilegeLevel: minimumPrivilegeLevel,
            Password: password,
        });
        this.authToken = response.authenticationToken;
        return { success: true, data: { message: 'Successfully logged in, the token is now stored' } };
    }

    /**
     * Queries the current server state.
     *
     * @returns A `Response` object with detailed server state information.
     */
    async queryServerState(): Promise<Response> {
        const response = await this.post('QueryServerState');
        return { success: true, data: response };
    }

    /**
     * Retrieves the server options.
     *
     * @returns A `Response` containing the current `ServerOptions`.
     */
    async getServerOptions(): Promise<Response> {
        const response = await this.post('GetServerOptions');
        return { success: true, data: response };
    }

    /**
     * Retrieves advanced game settings from the server.
     *
     * @returns A `Response` containing the `AdvancedGameSettings`.
     */
    async getAdvancedGameSettings(): Promise<Response> {
        const response = await this.post('GetAdvancedGameSettings');
        return { success: true, data: response };
    }

    /**
     * Applies advanced game settings to the server.
     *
     * @param settings - The settings to apply.
     * @returns A `Response` confirming successful application.
     *
     * @example
     * ```ts
     * await api.applyAdvancedGameSettings({ GodMode: true });
     * ```
     */
    async applyAdvancedGameSettings(settings: AdvancedGameSettings): Promise<Response> {
        await this.post('ApplyAdvancedGameSettings', {
            AdvancedGameSettings: AdvancedGameSettingsToDict(settings),
        });
        return {
            success: true,
            data: {
                message: 'Successfully applied advanced game settings to the server.',
                settings: AdvancedGameSettingsToDict(settings),
            },
        };
    }

    /**
     * Claims ownership of the server.
     *
     * @param serverName - Name to assign to the server.
     * @param adminPassword - Initial admin password.
     * @returns A `Response` with confirmation.
     */
    async claimServer(serverName: string, adminPassword: string): Promise<Response> {
        const response = await this.post('ClaimServer', {
            ServerName: serverName,
            AdminPassword: adminPassword,
        });
        return { success: true, data: response };
    }

    /**
     * Renames the server.
     *
     * @param serverName - New server name.
     * @returns A `Response` confirming the change.
     */
    async renameServer(serverName: string): Promise<Response> {
        const response = await this.post('RenameServer', { ServerName: serverName });
        return { success: true, data: response };
    }

    /**
     * Sets the client password for the server.
     *
     * @param password - New client password.
     * @returns A `Response` confirming the change.
     */
    async setClientPassword(password: string): Promise<Response> {
        const response = await this.post('SetClientPassword', { Password: password });
        return { success: true, data: response };
    }

    /**
     * Sets the administrator password.
     *
     * @param password - New admin password.
     * @param authToken - Admin authentication token.
     * @returns A `Response` confirming the change.
     */
    async setAdminPassword(password: string, authToken: string): Promise<Response> {
        const response = await this.post('SetAdminPassword', {
            Password: password,
            AuthenticationToken: authToken,
        });
        return { success: true, data: response };
    }

    /**
     * Sets the session name to auto-load on server start.
     *
     * @param sessionName - Name of the session.
     * @returns A `Response` confirming the change.
     */
    async setAutoLoadSessionName(sessionName: string): Promise<Response> {
        const response = await this.post('SetAutoLoadSessionName', { SessionName: sessionName });
        return { success: true, data: response };
    }

    /**
     * Executes a console command on the server.
     *
     * @param command - Command string to execute.
     * @returns A `Response` with the command output.
     */
    async runCommand(command: string): Promise<Response> {
        const response = await this.post('RunCommand', { Command: command });
        return { success: true, data: response };
    }

    /**
     * Shuts down the server.
     *
     * @returns A `Response` confirming shutdown. Note: server may restart automatically depending on its service settings.
     */
    async shutdown(): Promise<Response> {
        await this.post('Shutdown');
        return {
            success: true,
            data: {
                message:
                    "Server is shutting down... Note: If the server is configured as a service and the restart policy is set to 'always', it will restart automatically.",
            },
        };
    }

    /**
     * Applies server options.
     *
     * @param options - Server options to apply.
     * @returns A `Response` confirming application.
     */
    async applyServerOptions(options: ServerOptions): Promise<Response> {
        await this.post('ApplyServerOptions', { UpdatedServerOptions: serverOptionsToDict(options) });
        return {
            success: true,
            data: {
                message: 'Successfully applied server options to the server.',
                options: serverOptionsToDict(options),
            },
        };
    }

    /**
     * Creates a new game on the server.
     *
     * @param gameData - Configuration data for the new game.
     * @returns A `Response` confirming creation.
     */
    async createNewGame(gameData: NewGameData): Promise<Response> {
        const response = await this.post('CreateNewGame', { NewGameData: gameData });
        return { success: true, data: response };
    }

    /**
     * Saves the current game state.
     *
     * @param saveName - Name of the save file.
     * @returns A `Response` confirming the save.
     */
    async saveGame(saveName: string): Promise<Response> {
        const response = await this.post('SaveGame', { SaveName: saveName });
        return { success: true, data: response };
    }

    /**
     * Deletes a save file.
     *
     * @param saveName - Name of the save file to delete.
     * @returns A `Response` confirming deletion.
     */
    async deleteSaveFile(saveName: string): Promise<Response> {
        const response = await this.post('DeleteSaveFile', { SaveName: saveName });
        return { success: true, data: response };
    }

    /**
     * Deletes a save session.
     *
     * @param sessionName - Name of the session to delete.
     * @returns A `Response` confirming deletion.
     */
    async deleteSaveSession(sessionName: string): Promise<Response> {
        const response = await this.post('DeleteSaveSession', { SessionName: sessionName });
        return { success: true, data: response };
    }

    /**
     * Enumerates all save sessions on the server.
     *
     * @returns A `Response` containing the list of sessions.
     */
    async enumerateSessions(): Promise<Response> {
        const response = await this.post('EnumerateSessions');
        return { success: true, data: response };
    }

    /**
     * Loads a saved game on the server.
     *
     * @param saveName - Name of the save file.
     * @param enableAdvancedGameSettings - Whether to apply advanced game settings (default false).
     * @returns A `Response` confirming successful load.
     */
    async loadGame(saveName: string, enableAdvancedGameSettings = false): Promise<Response> {
        const response = await this.post('LoadGame', {
            SaveName: saveName,
            EnableAdvancedGameSettings: enableAdvancedGameSettings,
        });
        return { success: true, data: response };
    }

    /**
     * Uploads a save game to the server.
     *
     * @param saveName - Name of the save file.
     * @param loadSaveGame - Whether to load the game after upload (default false).
     * @param enableAdvancedGameSettings - Whether to apply advanced game settings (default false).
     * @throws {Error} This method is not implemented yet.
     */
    async uploadSaveGame(
        saveName: string,
        loadSaveGame = false,
        enableAdvancedGameSettings = false
    ): Promise<Response> {
        throw new Error('This method is not implemented yet');
    }

    /**
     * Downloads a save game from the server.
     *
     * @param saveName - Name of the save file.
     * @returns A `Response` containing the save as an ArrayBuffer.
     */
    async downloadSaveGame(saveName: string): Promise<Response> {
        const response = await this.post('DownloadSaveGame', { SaveName: saveName });
        // response is an ArrayBuffer for binary content
        return { success: true, data: response };
    }
}
