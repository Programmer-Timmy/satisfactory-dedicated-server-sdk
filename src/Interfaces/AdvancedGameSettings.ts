/**
 * Advanced game configuration options for a Satisfactory Dedicated Server session.
 *
 * These settings allow fine-grained control over gameplay mechanics, resources,
 * and player abilities. They are typically used when creating a new game or
 * modifying an existing session.
 *
 * @property NoPower - If `true`, disables power consumption and requirements.
 * @property DisableArachnidCreatures - If `true`, removes Arachnid enemies from the game.
 * @property NoUnlockCost - If `true`, all unlocks are free.
 * @property SetGamePhase - Sets the initial game phase (numeric value).
 * @property GiveAllTiers - If `true`, players start with all tiers unlocked.
 * @property UnlockAllResearchSchematics - If `true`, all research schematics are unlocked.
 * @property UnlockInstantAltRecipes - If `true`, alternate recipes are unlocked instantly.
 * @property UnlockAllResourceSinkSchematics - If `true`, all resource sink schematics are available.
 * @property GiveItems - A string specifying items to give at the start.
 * @property NoBuildCost - If `true`, building costs are removed.
 * @property GodMode - If `true`, players become invincible.
 * @property FlightMode - If `true`, players can fly.
 *
 * @example
 * ```ts
 * const settings: AdvancedGameSettings = {
 *   NoPower: true,
 *   GodMode: true,
 *   GiveAllTiers: false
 * };
 * ```
 */
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

/**
 * Converts an `AdvancedGameSettings` object into a dictionary format suitable
 * for sending to the Satisfactory Dedicated Server API.
 *
 * Each property is prefixed with `FG.` and all values are converted to strings.
 * Undefined or null values are omitted from the result.
 *
 * @param settings - The `AdvancedGameSettings` object to convert.
 * @returns A dictionary (`Record<string, string>`) mapping advanced game option keys to string values.
 *
 * @example
 * ```ts
 * const dict = AdvancedGameSettingsToDict({
 *   NoPower: true,
 *   GodMode: true
 * });
 * console.log(dict);
 * // Output: { "FG.NoPower": "true", "FG.GodMode": "true" }
 * ```
 */
export function AdvancedGameSettingsToDict(settings: AdvancedGameSettings): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key in settings) {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
            const value = settings[key as keyof AdvancedGameSettings];
            if (value !== undefined && value !== null) {
                result[`FG.${key}`] = String(value);
            }
        }
    }
    return result;
}
