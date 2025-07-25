export interface AdvancedGameSettings {
    NoPower?: boolean;
    DisableArachnidCreatures?: boolean;
    NoUnlockCost?: boolean;
    SetGamePhase?: number;
    GiveAllTiers?: boolean;
    UnlockAllResearchSchematics?: boolean;
    UnlockInstantAltRecipes?: boolean;
    UnlockAllResourceSinkSchematics?: boolean;
    GiveItems?: string;
    NoBuildCost?: boolean;
    GodMode?: boolean;
    FlightMode?: boolean;
}

export function AdvancedGameSettingsToDict(settings: AdvancedGameSettings): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key in settings) {
        // Use `hasOwnProperty` check to be safe
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
            const value = settings[key as keyof AdvancedGameSettings];
            if (value !== undefined && value !== null) {
                result[`FG.${key}`] = String(value);
            }
        }
    }
    return result;
}
