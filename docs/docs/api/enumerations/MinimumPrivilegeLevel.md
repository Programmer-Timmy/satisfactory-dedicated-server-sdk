[**satisfactory-dedicated-server-sdk**](../README.md)

***

Defined in: [src/Interfaces/MinimumPrivilegeLevel.ts:24](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/MinimumPrivilegeLevel.ts#L24)

Represents the minimum privilege level required to access certain API endpoints
or perform specific actions on a Satisfactory Dedicated Server.

This enum is used to control authorization and ensure that only users or tokens
with sufficient privileges can execute restricted operations.

## Example

```ts
function checkAccess(level: MinimumPrivilegeLevel) {
  if (level === MinimumPrivilegeLevel.ADMINISTRATOR) {
    console.log("Admin access granted");
  }
}
```

## Enumeration Members

### ADMINISTRATOR

> **ADMINISTRATOR**: `"Administrator"`

Defined in: [src/Interfaces/MinimumPrivilegeLevel.ts:27](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/MinimumPrivilegeLevel.ts#L27)

Full administrator privileges.

***

### API\_TOKEN

> **API\_TOKEN**: `"APIToken"`

Defined in: [src/Interfaces/MinimumPrivilegeLevel.ts:29](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/MinimumPrivilegeLevel.ts#L29)

Access granted via an API token.

***

### CLIENT

> **CLIENT**: `"Client"`

Defined in: [src/Interfaces/MinimumPrivilegeLevel.ts:26](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/MinimumPrivilegeLevel.ts#L26)

Standard client-level access.

***

### INITIAL\_ADMIN

> **INITIAL\_ADMIN**: `"InitialAdmin"`

Defined in: [src/Interfaces/MinimumPrivilegeLevel.ts:28](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/MinimumPrivilegeLevel.ts#L28)

The first admin created during server setup.

***

### NOT\_AUTHENTICATED

> **NOT\_AUTHENTICATED**: `"NotAuthenticated"`

Defined in: [src/Interfaces/MinimumPrivilegeLevel.ts:25](https://github.com/Programmer-Timmy/satisfactory-dedicated-server-sdk/blob/main/src/Interfaces/MinimumPrivilegeLevel.ts#L25)

Represents an unauthenticated user.
