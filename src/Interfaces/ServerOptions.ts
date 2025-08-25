/**
 * Options for configuring a Satisfactory Dedicated Server.
 *
 * These settings control server behavior such as auto-pausing, autosave intervals,
 * server restart scheduling, gameplay data reporting, and network quality.
 *
 * @property DSAutoPause - If `true`, the server automatically pauses when no players are connected.
 * @property DSAutoSaveOnDisconnect - If `true`, the server autosaves when a player disconnects.
 * @property AutosaveInterval - Interval in minutes between automatic saves.
 * @property ServerRestartTimeSlot - Preferred time slot for automatic server restarts (e.g., hour of the day).
 * @property SendGameplayData - Whether to send gameplay analytics data to the server.
 * @property NetworkQuality - Adjusts the network quality setting (0–100). Higher is better.
 *
 * @example
 * ```ts
 * const options: ServerOptions = {
 *   DSAutoPause: true,
 *   AutosaveInterval: 10,
 *   NetworkQuality: 80
 * };
 * ```
 */
export interface ServerOptions {
    DSAutoPause?: boolean;
    DSAutoSaveOnDisconnect?: boolean;
    AutosaveInterval?: number;
    ServerRestartTimeSlot?: number;
    SendGameplayData?: boolean;
    NetworkQuality?: number;
}

/**
 * Converts a `ServerOptions` object into a dictionary format suitable for
 * sending to the Satisfactory Dedicated Server API.
 *
 * Each property is prefixed with `FG.` and all values are converted to strings.
 * Undefined or null values are omitted from the result.
 *
 * @param options - The `ServerOptions` object to convert.
 * @returns A dictionary (`Record<string, string>`) mapping server option keys to string values.
 *
 * @example
 * ```ts
 * const optionsDict = serverOptionsToDict({
 *   DSAutoPause: true,
 *   AutosaveInterval: 10
 * });
 * console.log(optionsDict);
 * // Output: { "FG.DSAutoPause": "true", "FG.AutosaveInterval": "10" }
 * ```
 */
export function serverOptionsToDict(options: ServerOptions): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key in options) {
        const value = options[key as keyof ServerOptions];
        if (value !== undefined && value !== null) {
            result[`FG.${key}`] = String(value);
        }
    }
    return result;
}
