[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/Interfaces/Response.ts:25](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/Response.ts#L25)

Standardized response object returned by the Satisfactory Dedicated Server API.

Many API methods return this shape to indicate whether the request
was successful and to provide the associated result data.

## Example

```ts
const response: Response = {
  success: true,
  data: { playersOnline: 5, uptime: "2h 14m" }
};

if (response.success) {
  console.log("Server uptime:", response.data.uptime);
}
```

## Properties

### data

> **data**: `string` \| `Record`\<`string`, `any`\> \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [src/Interfaces/Response.ts:27](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/Response.ts#L27)

The response payload:
- `Record<string, any>` for structured JSON data
- `string` for plain text responses
- `Uint8Array` for binary data (e.g., save files)

***

### success

> **success**: `boolean`

Defined in: [src/Interfaces/Response.ts:26](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/Response.ts#L26)

Indicates if the request completed successfully.
