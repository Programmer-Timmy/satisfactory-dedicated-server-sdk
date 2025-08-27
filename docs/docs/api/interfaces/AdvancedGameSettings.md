[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/Interfaces/AdvancedGameSettings.ts:30](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L30)

Advanced game configuration options for a Satisfactory Dedicated Server session.

These settings allow fine-grained control over gameplay mechanics, resources,
and player abilities. They are typically used when creating a new game or
modifying an existing session.

## Example

```ts
const settings: AdvancedGameSettings = {
  NoPower: true,
  GodMode: true,
  GiveAllTiers: false
};
```

## Properties

### DisableArachnidCreatures?

> `optional` **DisableArachnidCreatures**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:32](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L32)

If `true`, removes Arachnid enemies from the game.

***

### FlightMode?

> `optional` **FlightMode**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:42](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L42)

If `true`, players can fly.

***

### GiveAllTiers?

> `optional` **GiveAllTiers**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:35](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L35)

If `true`, players start with all tiers unlocked.

***

### GiveItems?

> `optional` **GiveItems**: `string`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:39](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L39)

A string specifying items to give at the start.

***

### GodMode?

> `optional` **GodMode**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:41](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L41)

If `true`, players become invincible.

***

### NoBuildCost?

> `optional` **NoBuildCost**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:40](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L40)

If `true`, building costs are removed.

***

### NoPower?

> `optional` **NoPower**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:31](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L31)

If `true`, disables power consumption and requirements.

***

### NoUnlockCost?

> `optional` **NoUnlockCost**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:33](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L33)

If `true`, all unlocks are free.

***

### SetGamePhase?

> `optional` **SetGamePhase**: `number`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:34](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L34)

Sets the initial game phase (numeric value).

***

### UnlockAllResearchSchematics?

> `optional` **UnlockAllResearchSchematics**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:36](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L36)

If `true`, all research schematics are unlocked.

***

### UnlockAllResourceSinkSchematics?

> `optional` **UnlockAllResourceSinkSchematics**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:38](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L38)

If `true`, all resource sink schematics are available.

***

### UnlockInstantAltRecipes?

> `optional` **UnlockInstantAltRecipes**: `boolean`

Defined in: [src/Interfaces/AdvancedGameSettings.ts:37](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L37)

If `true`, alternate recipes are unlocked instantly.
