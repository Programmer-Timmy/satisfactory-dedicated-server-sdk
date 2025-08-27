[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/Interfaces/ServerOptions.ts:23](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L23)

Options for configuring a Satisfactory Dedicated Server.

These settings control server behavior such as auto-pausing, autosave intervals,
server restart scheduling, gameplay data reporting, and network quality.

## Example

```ts
const options: ServerOptions = {
  DSAutoPause: true,
  AutosaveInterval: 10,
  NetworkQuality: 80
};
```

## Properties

### AutosaveInterval?

> `optional` **AutosaveInterval**: `number`

Defined in: [src/Interfaces/ServerOptions.ts:26](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L26)

Interval in minutes between automatic saves.

***

### DSAutoPause?

> `optional` **DSAutoPause**: `boolean`

Defined in: [src/Interfaces/ServerOptions.ts:24](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L24)

If `true`, the server automatically pauses when no players are connected.

***

### DSAutoSaveOnDisconnect?

> `optional` **DSAutoSaveOnDisconnect**: `boolean`

Defined in: [src/Interfaces/ServerOptions.ts:25](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L25)

If `true`, the server autosaves when a player disconnects.

***

### NetworkQuality?

> `optional` **NetworkQuality**: `number`

Defined in: [src/Interfaces/ServerOptions.ts:29](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L29)

Adjusts the network quality setting (0–100). Higher is better.

***

### SendGameplayData?

> `optional` **SendGameplayData**: `boolean`

Defined in: [src/Interfaces/ServerOptions.ts:28](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L28)

Whether to send gameplay analytics data to the server.

***

### ServerRestartTimeSlot?

> `optional` **ServerRestartTimeSlot**: `number`

Defined in: [src/Interfaces/ServerOptions.ts:27](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/ServerOptions.ts#L27)

Preferred time slot for automatic server restarts (e.g., hour of the day).
