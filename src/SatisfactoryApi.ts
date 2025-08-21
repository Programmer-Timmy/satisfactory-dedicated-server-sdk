
import {MinimumPrivilegeLevel} from "./Interfaces/MinimumPrivilegeLevel";
import {AdvancedGameSettings, AdvancedGameSettingsToDict} from "./Interfaces/AdvancedGameSettings";
import {Response} from "./Interfaces/Response";
import {ServerOptions, serverOptionsToDict} from "./Interfaces/ServerOptions";
import {NewGameData} from "./Interfaces/NewGameData";
import {APIError} from "./exceptions/APIError";
import https from 'https';
import fetch from 'node-fetch';

/**
 * Options for the SatisfactoryAPI client.
 * @interface SatisfactoryApiOptions
 *
 * @property {boolean} [ignoreSSL=true] - Whether to ignore SSL certificate errors.
 * @property {number} [timeout=10000] - The timeout for requests in milliseconds.
 * @property {number} [healthCheckTimeout=1000] - The timeout for health check requests in milliseconds. This is set to 1000ms by default to ensure quick responses.
 */
export interface SatisfactoryApiOptions {
    ignoreSSL?: boolean;
    timeout?: number;
    healthCheckTimeout?: number;
}

export class SatisfactoryApi {
    host: string;
    port: number;
    authToken?: string;
    options? : SatisfactoryApiOptions;


    constructor(host: string, port = 7777, options?: SatisfactoryApiOptions , authToken?: string) {
        this.host = host;
        this.port = port;
        this.authToken = authToken;
        this.options = options || {};

        if (this.authToken) {
            this.verifyAuthenticationToken().catch((err) => {
                // handle error if needed, or throw
                throw err;
            });
        }
    }


    private async post(functionName: string, data?: any, timeout = 10000, files?: FormData): Promise<any> {
        const url = `https://${this.host}:${this.port}/api/v1`;

        const headers: Record<string, string> = {};

        const httpsAgent = new https.Agent({
            rejectUnauthorized: this.options?.ignoreSSL ?? false,
        });

        let body: any;

        if (files) {
            body = files;
            if (this.authToken) {
                headers['Authorization'] = `Bearer ${this.authToken}`;
            }
        } else {
            headers['Content-Type'] = 'application/json';
            if (this.authToken) {
                headers['Authorization'] = `Bearer ${this.authToken}`;
            }
            body = JSON.stringify(data ? { function: functionName, data } : { function: functionName });
        }

        // ✅ Implement timeout using AbortController
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
                agent: httpsAgent,
                signal: controller.signal, // <-- this makes abort work
                //@ts-ignore
            }).catch((err) => {
                if (err.name === 'AbortError') {
                    throw new APIError('TIMEOUT_ERROR', `Request timed out after ${timeout}ms`);
                }
                console.error(`Network error while calling ${functionName}:`, err);
                throw new APIError('NETWORK_ERROR', `Network error: ${err.message}. Please check your host and port.`);
            });

            clearTimeout(id); // ✅ clear timeout when done

            if (response.status !== 200 && response.status !== 204) {
                const errorText = await response.text();
                console.error(`Error response from ${functionName}:`, errorText);
                throw new APIError(
                    `API_ERROR_${response.status}`,
                    `API error: ${errorText || 'Unknown error'}. Status code: ${response.status}`
                );
            }

            if (response.status === 204) {
                return {};
            }

            const contentType = response.headers.get('Content-Type') ?? '';

            switch (contentType.toLowerCase()) {
                case 'application/json;charset=utf-8':
                case 'application/json':
                    const json: any = await response.json();
                    if (json.errorCode) {
                        throw new APIError(json.errorMessage || 'API error', json.errorCode);
                    }
                    return json.data;
                case 'application/octet-stream':
                    return await response.arrayBuffer();
                default:
                    return await response.text();
            }
        } finally {
            clearTimeout(id);
        }
    }

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

    async verifyAuthenticationToken(): Promise<Response> {
        await this.post('VerifyAuthenticationToken');
        return { success: true, data: { message: 'Token is valid' } };
    }

    async passwordlessLogin(minimumPrivilegeLevel: MinimumPrivilegeLevel): Promise<Response> {
        const response = await this.post('PasswordlessLogin', {
            MinimumPrivilegeLevel: minimumPrivilegeLevel,
        });
        this.authToken = response.authenticationToken;
        return { success: true, data: { message: 'Successfully logged in, the token is now stored' } };
    }

    async passwordLogin(minimumPrivilegeLevel: MinimumPrivilegeLevel, password: string): Promise<Response> {
        const response = await this.post('PasswordLogin', {
            MinimumPrivilegeLevel: minimumPrivilegeLevel,
            Password: password,
        });
        this.authToken = response.authenticationToken;
        return { success: true, data: { message: 'Successfully logged in, the token is now stored' } };
    }

    async queryServerState(): Promise<Response> {
        const response = await this.post('QueryServerState');
        return { success: true, data: response };
    }

    async getServerOptions(): Promise<Response> {
        const response = await this.post('GetServerOptions');
        return { success: true, data: response };
    }

    async getAdvancedGameSettings(): Promise<Response> {
        const response = await this.post('GetAdvancedGameSettings');
        return { success: true, data: response };
    }

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

    async claimServer(serverName: string, adminPassword: string): Promise<Response> {
        const response = await this.post('ClaimServer', {
            ServerName: serverName,
            AdminPassword: adminPassword,
        });
        return { success: true, data: response };
    }

    async renameServer(serverName: string): Promise<Response> {
        const response = await this.post('RenameServer', { ServerName: serverName });
        return { success: true, data: response };
    }

    async setClientPassword(password: string): Promise<Response> {
        const response = await this.post('SetClientPassword', { Password: password });
        return { success: true, data: response };
    }

    async setAdminPassword(password: string, authToken: string): Promise<Response> {
        const response = await this.post('SetAdminPassword', {
            Password: password,
            AuthenticationToken: authToken,
        });
        return { success: true, data: response };
    }

    async setAutoLoadSessionName(sessionName: string): Promise<Response> {
        const response = await this.post('SetAutoLoadSessionName', { SessionName: sessionName });
        return { success: true, data: response };
    }

    async runCommand(command: string): Promise<Response> {
        const response = await this.post('RunCommand', { Command: command });
        return { success: true, data: response };
    }

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

    async createNewGame(gameData: NewGameData): Promise<Response> {
        const response = await this.post('CreateNewGame', { NewGameData: gameData });
        return { success: true, data: response };
    }

    async saveGame(saveName: string): Promise<Response> {
        const response = await this.post('SaveGame', { SaveName: saveName });
        return { success: true, data: response };
    }

    async deleteSaveFile(saveName: string): Promise<Response> {
        const response = await this.post('DeleteSaveFile', { SaveName: saveName });
        return { success: true, data: response };
    }

    async deleteSaveSession(sessionName: string): Promise<Response> {
        const response = await this.post('DeleteSaveSession', { SessionName: sessionName });
        return { success: true, data: response };
    }

    async enumerateSessions(): Promise<Response> {
        const response = await this.post('EnumerateSessions');
        return { success: true, data: response };
    }

    async loadGame(saveName: string, enableAdvancedGameSettings = false): Promise<Response> {
        const response = await this.post('LoadGame', {
            SaveName: saveName,
            EnableAdvancedGameSettings: enableAdvancedGameSettings,
        });
        return { success: true, data: response };
    }

    async uploadSaveGame(
        saveName: string,
        loadSaveGame = false,
        enableAdvancedGameSettings = false
    ): Promise<Response> {
        throw new Error('This method is not implemented yet');
    }

    async downloadSaveGame(saveName: string): Promise<Response> {
        const response = await this.post('DownloadSaveGame', { SaveName: saveName });
        // response is an ArrayBuffer for binary content
        return { success: true, data: response };
    }
}
