export interface ServerOptions {
    DSAutoPause?: boolean;
    DSAutoSaveOnDisconnect?: boolean;
    AutosaveInterval?: number;
    ServerRestartTimeSlot?: number;
    SendGameplayData?: boolean;
    NetworkQuality?: number;
}

// Utility function similar to to_dict()
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
