import {AdvancedGameSettings} from "./AdvancedGameSettings";


export interface NewGameData {
    SessionName: string;
    MapName?: string | null;
    StartingLocation?: string | null;
    SkipOnboarding?: boolean | null;
    AdvancedGameSettings?: AdvancedGameSettings | null;
    CustomOptionsOnlyForModding?: Record<string, any> | null;
}
