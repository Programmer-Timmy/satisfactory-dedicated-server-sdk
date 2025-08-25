[**satisfactory-dedicated-server-sdk**](../README.md)

***

> **AdvancedGameSettingsToDict**(`settings`): `Record`\<`string`, `string`\>

Defined in: [src/Interfaces/AdvancedGameSettings.ts:65](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/AdvancedGameSettings.ts#L65)

Converts an `AdvancedGameSettings` object into a dictionary format suitable
for sending to the Satisfactory Dedicated Server API.

Each property is prefixed with `FG.` and all values are converted to strings.
Undefined or null values are omitted from the result.

## Parameters

### settings

[`AdvancedGameSettings`](../interfaces/AdvancedGameSettings.md)

The `AdvancedGameSettings` object to convert.

## Returns

`Record`\<`string`, `string`\>

A dictionary (`Record<string, string>`) mapping advanced game option keys to string values.

## Example

```ts
const dict = AdvancedGameSettingsToDict({
  NoPower: true,
  GodMode: true
});
console.log(dict);
// Output: { "FG.NoPower": "true", "FG.GodMode": "true" }
```
