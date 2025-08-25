/**
 * Configuration options for initializing a connection to the Satisfactory Dedicated Server API.
 *
 * These options allow customization of SSL usage, request timeouts, and health check behavior.
 *
 * @property skipSSLVerification - If `true`, SSL certificate verification is skipped. Default is `false`.
 * @property timeout - Maximum time in milliseconds for API requests before they fail. Default is determined by the library.
 * @property healthCheckTimeout - Maximum time in milliseconds to wait for the server health check response.
 *
 * @example
 * ```ts
 * const options: SatisfactoryApiOptions = {
 *   disableSSL: false,
 *   timeout: 5000,
 *   healthCheckTimeout: 2000
 * };
 * ```
 */
export interface SatisfactoryApiOptions {
    skipSSLVerification?: boolean;
    timeout?: number;
    healthCheckTimeout?: number;
}
