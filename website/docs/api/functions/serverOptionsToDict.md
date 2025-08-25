[**satisfactory-dedicated-server-sdk**](../README.md)

***

> **serverOptionsToDict**(`options`): `Record`\<`string`, `string`\>

Defined in: [src/Interfaces/ServerOptions.ts:52](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L52)

Converts a `ServerOptions` object into a dictionary format suitable for
sending to the Satisfactory Dedicated Server API.

Each property is prefixed with `FG.` and all values are converted to strings.
Undefined or null values are omitted from the result.

## Parameters

### options

[`ServerOptions`](../interfaces/ServerOptions.md)

The `ServerOptions` object to convert.

## Returns

`Record`\<`string`, `string`\>

A dictionary (`Record<string, string>`) mapping server option keys to string values.

## Example

```ts
const optionsDict = serverOptionsToDict({
  DSAutoPause: true,
  AutosaveInterval: 10
});
console.log(optionsDict);
// Output: { "FG.DSAutoPause": "true", "FG.AutosaveInterval": "10" }
```
