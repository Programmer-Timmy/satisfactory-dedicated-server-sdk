[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/SatisfactoryApi.ts:29](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L29)

Main API client for interacting with a Satisfactory Dedicated Server.

Provides methods to manage server options, create or load games, query server state,
perform authentication, and run commands. Supports secure HTTPS communication
with optional SSL certificate initialization.

## Example

```ts
const api = new SatisfactoryApi("127.0.0.1", 7777, { disableSSL: false });
await api.initCertificate();
const health = await api.healthCheck();
console.log(health.success); // true if server is reachable
```

## Constructors

### Constructor

> **new SatisfactoryApi**(`host`, `port`, `options?`, `authToken?`): `SatisfactoryApi`

Defined in: [src/SatisfactoryApi.ts:44](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L44)

Creates a new API client instance.

#### Parameters

##### host

`string`

The server hostname or IP address.

##### port

`number` = `7777`

The server port (default 7777).

##### options?

[`SatisfactoryApiOptions`](../interfaces/SatisfactoryApiOptions.md)

Optional configuration for the client.

##### authToken?

`string`

Optional authentication token for API access.

#### Returns

`SatisfactoryApi`

## Properties

### authToken?

> `optional` **authToken**: `string`

Defined in: [src/SatisfactoryApi.ts:32](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L32)

***

### host

> **host**: `string`

Defined in: [src/SatisfactoryApi.ts:30](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L30)

***

### options?

> `optional` **options**: [`SatisfactoryApiOptions`](../interfaces/SatisfactoryApiOptions.md)

Defined in: [src/SatisfactoryApi.ts:33](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L33)

***

### port

> **port**: `number`

Defined in: [src/SatisfactoryApi.ts:31](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L31)

## Methods

### applyAdvancedGameSettings()

> **applyAdvancedGameSettings**(`settings`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:282](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L282)

Applies advanced game settings to the server.

#### Parameters

##### settings

[`AdvancedGameSettings`](../interfaces/AdvancedGameSettings.md)

The settings to apply.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming successful application.

#### Example

```ts
await api.applyAdvancedGameSettings({ GodMode: true });
```

***

### applyServerOptions()

> **applyServerOptions**(`options`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:391](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L391)

Applies server options.

#### Parameters

##### options

[`ServerOptions`](../interfaces/ServerOptions.md)

Server options to apply.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming application.

***

### claimServer()

> **claimServer**(`serverName`, `adminPassword`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:302](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L302)

Claims ownership of the server.

#### Parameters

##### serverName

`string`

Name to assign to the server.

##### adminPassword

`string`

Initial admin password.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` with confirmation.

***

### createNewGame()

> **createNewGame**(`gameData`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:408](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L408)

Creates a new game on the server.

#### Parameters

##### gameData

[`NewGameData`](../interfaces/NewGameData.md)

Configuration data for the new game.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming creation.

***

### deleteSaveFile()

> **deleteSaveFile**(`saveName`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:430](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L430)

Deletes a save file.

#### Parameters

##### saveName

`string`

Name of the save file to delete.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming deletion.

***

### deleteSaveSession()

> **deleteSaveSession**(`sessionName`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:441](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L441)

Deletes a save session.

#### Parameters

##### sessionName

`string`

Name of the session to delete.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming deletion.

***

### downloadSaveGame()

> **downloadSaveGame**(`saveName`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:493](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L493)

Downloads a save game from the server.

#### Parameters

##### saveName

`string`

Name of the save file.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` containing the save as an ArrayBuffer.

***

### enumerateSessions()

> **enumerateSessions**(): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:451](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L451)

Enumerates all save sessions on the server.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` containing the list of sessions.

***

### getAdvancedGameSettings()

> **getAdvancedGameSettings**(): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:266](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L266)

Retrieves advanced game settings from the server.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` containing the `AdvancedGameSettings`.

***

### getServerOptions()

> **getServerOptions**(): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:256](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L256)

Retrieves the server options.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` containing the current `ServerOptions`.

***

### healthCheck()

> **healthCheck**(`clientCustomData`, `retries`): `Promise`\<\{ `data?`: `any`; `message?`: `string`; `success`: `boolean`; \}\>

Defined in: [src/SatisfactoryApi.ts:172](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L172)

Performs a health check on the server.

#### Parameters

##### clientCustomData

`string` = `''`

Optional client data to include in the request.

##### retries

`number` = `3`

Number of retries if the health check fails (default 3).

#### Returns

`Promise`\<\{ `data?`: `any`; `message?`: `string`; `success`: `boolean`; \}\>

An object indicating success and optional server response data.

#### Example

```ts
const health = await api.healthCheck();
if (health.success) console.log("Server is healthy");
```

***

### initCertificate()

> **initCertificate**(): `Promise`\<`void`\>

Defined in: [src/SatisfactoryApi.ts:63](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L63)

Fetches and trusts the server SSL certificate on initialization.

This method must be called before making API requests if SSL verification
is enabled. It saves the certificate locally and sets up the HTTPS agent.

#### Returns

`Promise`\<`void`\>

#### Throws

If the certificate cannot be fetched or written.

#### Example

```ts
await api.initCertificate();
```

***

### loadGame()

> **loadGame**(`saveName`, `enableAdvancedGameSettings`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:463](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L463)

Loads a saved game on the server.

#### Parameters

##### saveName

`string`

Name of the save file.

##### enableAdvancedGameSettings

`boolean` = `false`

Whether to apply advanced game settings (default false).

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming successful load.

***

### passwordlessLogin()

> **passwordlessLogin**(`minimumPrivilegeLevel`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:217](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L217)

Performs a passwordless login with a given minimum privilege level.

#### Parameters

##### minimumPrivilegeLevel

[`MinimumPrivilegeLevel`](../enumerations/MinimumPrivilegeLevel.md)

The minimum privilege required.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` indicating successful login and stores the token.

***

### passwordLogin()

> **passwordLogin**(`minimumPrivilegeLevel`, `password`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:232](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L232)

Performs a password login with a given minimum privilege level.

#### Parameters

##### minimumPrivilegeLevel

[`MinimumPrivilegeLevel`](../enumerations/MinimumPrivilegeLevel.md)

The minimum privilege required.

##### password

`string`

The password to authenticate with.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` indicating successful login and stores the token.

***

### queryServerState()

> **queryServerState**(): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:246](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L246)

Queries the current server state.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` object with detailed server state information.

***

### renameServer()

> **renameServer**(`serverName`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:316](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L316)

Renames the server.

#### Parameters

##### serverName

`string`

New server name.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming the change.

***

### runCommand()

> **runCommand**(`command`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:364](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L364)

Executes a console command on the server.

#### Parameters

##### command

`string`

Command string to execute.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` with the command output.

***

### saveGame()

> **saveGame**(`saveName`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:419](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L419)

Saves the current game state.

#### Parameters

##### saveName

`string`

Name of the save file.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming the save.

***

### setAdminPassword()

> **setAdminPassword**(`password`, `authToken`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:339](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L339)

Sets the administrator password.

#### Parameters

##### password

`string`

New admin password.

##### authToken

`string`

Admin authentication token.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming the change.

***

### setAutoLoadSessionName()

> **setAutoLoadSessionName**(`sessionName`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:353](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L353)

Sets the session name to auto-load on server start.

#### Parameters

##### sessionName

`string`

Name of the session.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming the change.

***

### setClientPassword()

> **setClientPassword**(`password`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:327](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L327)

Sets the client password for the server.

#### Parameters

##### password

`string`

New client password.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming the change.

***

### shutdown()

> **shutdown**(): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:374](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L374)

Shuts down the server.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` confirming shutdown. Note: server may restart automatically depending on its service settings.

***

### uploadSaveGame()

> **uploadSaveGame**(`saveName`, `loadSaveGame`, `enableAdvancedGameSettings`): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:479](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L479)

Uploads a save game to the server.

#### Parameters

##### saveName

`string`

Name of the save file.

##### loadSaveGame

`boolean` = `false`

Whether to load the game after upload (default false).

##### enableAdvancedGameSettings

`boolean` = `false`

Whether to apply advanced game settings (default false).

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

#### Throws

This method is not implemented yet.

***

### verifyAuthenticationToken()

> **verifyAuthenticationToken**(): `Promise`\<[`Response`](../interfaces/Response.md)\>

Defined in: [src/SatisfactoryApi.ts:206](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/SatisfactoryApi.ts#L206)

Verifies that the stored authentication token is valid.

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\>

A `Response` object confirming token validity.

#### Throws

If the API responds with an error.
