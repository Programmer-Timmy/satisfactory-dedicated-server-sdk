[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/Interfaces/SatisfactoryApiOptions.ts:19](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/SatisfactoryApiOptions.ts#L19)

Configuration options for initializing a connection to the Satisfactory Dedicated Server API.

These options allow customization of SSL usage, request timeouts, and health check behavior.

## Example

```ts
const options: SatisfactoryApiOptions = {
  disableSSL: false,
  timeout: 5000,
  healthCheckTimeout: 2000
};
```

## Properties

### healthCheckTimeout?

> `optional` **healthCheckTimeout**: `number`

Defined in: [src/Interfaces/SatisfactoryApiOptions.ts:22](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/SatisfactoryApiOptions.ts#L22)

Maximum time in milliseconds to wait for the server health check response.

***

### skipSSLVerification?

> `optional` **skipSSLVerification**: `boolean`

Defined in: [src/Interfaces/SatisfactoryApiOptions.ts:20](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/SatisfactoryApiOptions.ts#L20)

If `true`, SSL certificate verification is skipped. Default is `false`.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/Interfaces/SatisfactoryApiOptions.ts:21](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/SatisfactoryApiOptions.ts#L21)

Maximum time in milliseconds for API requests before they fail. Default is determined by the library.
