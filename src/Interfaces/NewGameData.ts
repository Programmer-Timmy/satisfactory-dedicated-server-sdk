import {AdvancedGameSettings} from "./AdvancedGameSettings";


/**
 * Represents the configuration data required to start a new Satisfactory game session.
 *
 * This interface is used when creating a fresh world on a dedicated server.
 * It defines session metadata, map details, onboarding flow, and optional advanced game settings.
 *
 * @property SessionName - The name of the session. Required.
 * @property MapName - The map to load. If omitted or `null`, the default map is used.
 * @property StartingLocation - The player’s initial spawn location. If `null`, the server default is applied.
 * @property SkipOnboarding - Whether to skip the onboarding/tutorial sequence. Defaults to `false` if not provided.
 * @property AdvancedGameSettings - Optional advanced game settings for world generation and rules.
 * @property CustomOptionsOnlyForModding - Extra mod-specific options. Keys and values depend on the mods installed.
 *
 * @example
 * ```ts
 * const newGame: NewGameData = {
 *   SessionName: "FactoryWorld1",
 *   MapName: "Desert",
 *   StartingLocation: "NorthGrasslands",
 *   SkipOnboarding: true,
 *   AdvancedGameSettings: {
 *     // Example from AdvancedGameSettings interface
 *     ResourceSinkMultiplier: 2,
 *   },
 *   CustomOptionsOnlyForModding: {
 *     myModSetting: "enabled",
 *   }
 * };
 * ```
 */
export interface NewGameData {
    SessionName: string;
    MapName?: string | null;
    StartingLocation?: string | null;
    SkipOnboarding?: boolean | null;
    AdvancedGameSettings?: AdvancedGameSettings | null;
    CustomOptionsOnlyForModding?: Record<string, any> | null;
}
