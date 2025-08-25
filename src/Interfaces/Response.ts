/**
 * Standardized response object returned by the Satisfactory Dedicated Server API.
 *
 * Many API methods return this shape to indicate whether the request
 * was successful and to provide the associated result data.
 *
 * @property success - Indicates if the request completed successfully.
 * @property data - The response payload:
 * - `Record<string, any>` for structured JSON data
 * - `string` for plain text responses
 * - `Uint8Array` for binary data (e.g., save files)
 *
 * @example
 * ```ts
 * const response: Response = {
 *   success: true,
 *   data: { playersOnline: 5, uptime: "2h 14m" }
 * };
 *
 * if (response.success) {
 *   console.log("Server uptime:", response.data.uptime);
 * }
 * ```
 */
export interface Response {
    success: boolean;
    data: Record<string, any> | string | Uint8Array;
}