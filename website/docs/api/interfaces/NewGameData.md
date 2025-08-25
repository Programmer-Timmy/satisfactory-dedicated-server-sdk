[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/Interfaces/NewGameData.ts:34](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L34)

Represents the configuration data required to start a new Satisfactory game session.

This interface is used when creating a fresh world on a dedicated server.
It defines session metadata, map details, onboarding flow, and optional advanced game settings.

## Example

```ts
const newGame: NewGameData = {
  SessionName: "FactoryWorld1",
  MapName: "Desert",
  StartingLocation: "NorthGrasslands",
  SkipOnboarding: true,
  AdvancedGameSettings: {
    // Example from AdvancedGameSettings interface
    ResourceSinkMultiplier: 2,
  },
  CustomOptionsOnlyForModding: {
    myModSetting: "enabled",
  }
};
```

## Properties

### AdvancedGameSettings?

> `optional` **AdvancedGameSettings**: `null` \| [`AdvancedGameSettings`](AdvancedGameSettings.md)

Defined in: [src/Interfaces/NewGameData.ts:39](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L39)

Optional advanced game settings for world generation and rules.

***

### CustomOptionsOnlyForModding?

> `optional` **CustomOptionsOnlyForModding**: `null` \| `Record`\<`string`, `any`\>

Defined in: [src/Interfaces/NewGameData.ts:40](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L40)

Extra mod-specific options. Keys and values depend on the mods installed.

***

### MapName?

> `optional` **MapName**: `null` \| `string`

Defined in: [src/Interfaces/NewGameData.ts:36](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L36)

The map to load. If omitted or `null`, the default map is used.

***

### SessionName

> **SessionName**: `string`

Defined in: [src/Interfaces/NewGameData.ts:35](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L35)

The name of the session. Required.

***

### SkipOnboarding?

> `optional` **SkipOnboarding**: `null` \| `boolean`

Defined in: [src/Interfaces/NewGameData.ts:38](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L38)

Whether to skip the onboarding/tutorial sequence. Defaults to `false` if not provided.

***

### StartingLocation?

> `optional` **StartingLocation**: `null` \| `string`

Defined in: [src/Interfaces/NewGameData.ts:37](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/NewGameData.ts#L37)

The player’s initial spawn location. If `null`, the server default is applied.
