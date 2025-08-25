# Satisfactory Dedicated Server SDK

A TypeScript / JavaScript SDK for interacting with the **Satisfactory** dedicated server API.

> **Note:** This package is still in early development and may change frequently. It is **not recommended** for production environments yet.

---

## Features

- Easy-to-use interface for managing and querying your Satisfactory dedicated server
- Written in TypeScript with type definitions included
- Supports common server API endpoints for authentication, player management, server status, and more
- Lightweight with minimal dependencies
- Works in Node.js and modern JS environments

---

## Installation

```bash
npm install satisfactory-dedicated-server-api
# or
yarn add satisfactory-dedicated-server-api
````

---

## Documentation

Full documentation is available on the GitHub Pages site:

* **Getting Started Guide:** [Docs / Guides / Getting Started](https://programmer-timmy.github.io/satisfactory-dedicated-server-sdk/docs/guides/getting-started)
* **Error Handling Guide:** [Docs / Guides / Error Handling](https://programmer-timmy.github.io/satisfactory-dedicated-server-sdk/docs/guides/error-handling)
* **API Reference:** [Docs / API](https://programmer-timmy.github.io/satisfactory-dedicated-server-sdk/docs/api/overview)
* **Examples:** [Docs / Examples](https://programmer-timmy.github.io/satisfactory-dedicated-server-sdk/docs/examples/)

> 💡 Tip: Check the guides for setup, authentication, and example usage before diving into the API reference.

---

## Basic Usage

```ts
import { SatisfactoryApi, MinimumPrivilegeLevel } from 'satisfactory-dedicated-server-api';

const api = new SatisfactoryApi('127.0.0.1', 7777);

// Fetch and trust the server certificate before making requests
await api.initCertificate();

// Check if server is online
const health = await api.healthCheck();
if (health.success) console.log('Server is online');

// Authenticate
await api.passwordlessLogin(MinimumPrivilegeLevel.ADMINISTRATOR);

// Query server state
const state = await api.queryServerState();
console.log(state.data);
```

> For more examples and advanced features, see the [Examples](https://programmer-timmy.github.io/satisfactory-dedicated-server-sdk/docs/examples/) section on the docs site.

---

## Contributing

Contributions, issues, and feature requests are welcome!

* Check [issues](https://github.com/programmer-timmy/satisfactory-dedicated-server-sdk/issues) for known bugs and feature requests.
* Pull requests are encouraged — follow the coding style in the SDK.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

> **Disclaimer:** This software has no affiliation with Satisfactory or Coffee Stain Studios. It is a community project to interact with the Satisfactory dedicated server API.

