---
id: error-handling
title: Error Handling Guide
sidebar_label: Error Handling
---

# Error Handling in Satisfactory Dedicated Server API

The `satisfactory-dedicated-server-api` provides several **error classes** to help you handle API failures gracefully. Proper error handling ensures your application can respond to server errors, invalid parameters, and network issues without crashing.

<details>
<summary>Experienced Users / Quick Reference</summary>

* `APIError`: base class for all API failures.
* `InvalidParameterError`: subclass for parameter issues.
* Use [`MinimumPrivilegeLevel`](/docs/api/enumerations/MinimumPrivilegeLevel.md) to check permissions.
* Catch network or HTTP errors separately.
* Example pattern:

```ts
try {
  await api.applyServerOptions({ DSAutoPause: true });
} catch (err) {
  if (err instanceof InvalidParameterError) {
    console.error('Check input parameters:', err.message);
  } else if (err instanceof APIError) {
    console.error('API error:', err.errorCode, err.message);
  } else {
    console.error('Network or unknown error:', err);
  }
}
```

</details>
---

## Error Classes

### [`APIError`](/docs/api/classes/APIError)

`APIError` is the **base class** for all API-related errors.

```ts
import { APIError } from 'satisfactory-dedicated-server-api';

try {
  await api.saveGame('MySave1');
} catch (err) {
  if (err instanceof APIError) {
    console.error(`API Error: ${err.errorCode} - ${err.message}`);
  }
}
````

* `errorCode`: a string representing the specific error returned by the API.
* `message`: human-readable error description.
* Use `instanceof APIError` to catch all API-related errors.

---

### [`InvalidParameterError`](/docs/api/classes/InvalidParameterError)

`InvalidParameterError` is a **specific subclass** of `APIError` thrown when the API detects invalid or missing parameters.

```ts
import { InvalidParameterError } from 'satisfactory-dedicated-server-api';

try {
  await api.createNewGame({} as any); // Missing required fields
} catch (err) {
  if (err instanceof InvalidParameterError) {
    console.error('Invalid parameters provided:', err.message);
  }
}
```

* Use `instanceof InvalidParameterError` to handle **parameter validation issues** separately from other API errors.

---

## Handling Authentication Errors

Some actions require **sufficient privileges**. If your token or login does not meet the required [`MinimumPrivilegeLevel`](/docs/api/enumerations/MinimumPrivilegeLevel.md), the API may return an error.

```ts
import { MinimumPrivilegeLevel, APIError } from 'satisfactory-dedicated-server-api';

try {
  await api.passwordlessLogin(MinimumPrivilegeLevel.CLIENT);
} catch (err) {
  if (err instanceof APIError) {
    console.error('Authentication failed:', err.message);
  }
}
```

* Always check the returned error code or class to determine the cause.
* Adjust your login method or privileges accordingly.

---

## Network & HTTP Errors

* The API sends requests over **HTTPS**.
* Network failures, timeouts, or unreachable servers will throw standard errors (e.g., `Error`, `FetchError`).
* Wrap your calls in `try/catch` to handle connectivity issues:

```ts
try {
  const health = await api.healthCheck();
} catch (err) {
  console.error('Network error or server unreachable:', err.message);
}
```

---

## Best Practices

1. **Catch errors at the top-level** for each API call.
2. **Differentiate between API errors and network errors** using `instanceof`.
3. **Log error codes** (`err.errorCode`) to debug server-side issues.
4. **Handle insufficient privileges** gracefully, prompting users to log in with higher access if needed.

