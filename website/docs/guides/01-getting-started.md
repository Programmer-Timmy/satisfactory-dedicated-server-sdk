---
id: getting-started
title: Getting Started with Satisfactory Dedicated Server API
sidebar_label: Getting Started
---


# Satisfactory Dedicated Server API

The `satisfactory-dedicated-server-api` package provides a TypeScript / JavaScript client to interact with your Satisfactory Dedicated Server. With this package, you can:

- Manage server options
- Create, load, and save games
- Apply advanced game settings
- Query server state
- Run server commands
- Handle authentication (passwordless or password-based)

This guide is designed to help you get started quickly, whether you are a newcomer or an experienced developer.

<details class="alert alert--info">
  <summary>Quick Start / Experienced Users</summary>

If you already know the basics and want a fast reference:

1. **Install the package**  
   ```bash
   npm install satisfactory-dedicated-server-api
   ```

2. **Import and initialize the API client**

   ```ts
   import { SatisfactoryApi } from 'satisfactory-dedicated-server-api';
   const api = new SatisfactoryApi('127.0.0.1', 7777);
   ```
3. **Fetch and trust the server certificate**

   ```ts
   await api.initCertificate();
   ```
4. **Perform a health check**

   ```ts
   const health = await api.healthCheck();
   ```
5. **Log in (passwordless or password-based)**

   ```ts
   await api.passwordlessLogin(MinimumPrivilegeLevel.ADMINISTRATOR);
   ```
6. **Refer to the [API Reference](/docs/api/README.md)** for full details on methods, options, and error handling.

</details>

---

## Installation

Install the package using npm or yarn:

```bash
npm install satisfactory-dedicated-server-api
# or
yarn add satisfactory-dedicated-server-api
````

---

## Basic Usage

### Import and Initialize

```ts
import { SatisfactoryApi, MinimumPrivilegeLevel } from 'satisfactory-dedicated-server-api';

// Create a new API client instance connecting to your server at 127.0.0.1:7777
const api = new SatisfactoryApi('127.0.0.1', 7777);
```

### Fetch and Trust the Server Certificate

Before using the API, you **must fetch and trust the server's SSL certificate**:

```ts
await api.initCertificate();
```

* This ensures the certificate is loaded and trusted by nodejs

---

### SSL Certificates and Hostname Considerations

The API communicates with the server over **HTTPS**, which requires a valid SSL certificate.
Node.js enforces two checks:

1. **Certificate validity** – Is the certificate trusted by your system?
2. **Hostname matching** – Does the certificate hostname match the server hostname you are connecting to?

> ⚠️ On local servers (like `127.0.0.1`), the hostname usually does not match a self-signed certificate, which causes Node.js to reject the connection.

<details class="alert alert--warning">
<summary>⚠️ Hostname mismatch error & bypass</summary>

If you connect using a local IP or a hostname that does not match the certificate,
you may encounter a **hostname mismatch error** during TLS verification.

To bypass this in **development or local testing**, you can disable strict SSL verification:

```ts
const api = new SatisfactoryApi('127.0.0.1', 7777, { skipSSLVerification: true });
```

⚠️ **Warning:** Only use this option in trusted environments (like local testing).  
Do **not** disable SSL verification in production, as it removes protection against man-in-the-middle attacks.  
For a proper fix, see Creating a Proper Self-Signed Certificate below.

</details>

<details>
<summary>✅ Creating a Proper Self-Signed Certificate</summary>

Instead of bypassing SSL checks, you can generate a self-signed certificate that matches your server’s hostname or IP.
This ensures **secure SSL validation** without disabling hostname verification.

1. Go to your FactoryGame directory
2. Create a folder named `Certificates` in `FactoryGame\`
3. Create a file named `server.cnf` with the following content (replace `<YOUR_IP_OR_HOSTNAME>`, `<YOUR_IP>`, and `<YOUR_HOSTNAME>` accordingly):

   ```
   [req]
   default_bits       = 2048
   prompt             = no
   default_md         = sha256
   req_extensions     = req_ext
   distinguished_name = dn

   [dn]
   CN = <YOUR_IP_OR_HOSTNAME>

   [req_ext]
   subjectAltName = @alt_names

   [alt_names]
   IP.1 = <YOUR_IP>
   DNS.1 = <YOUR_HOSTNAME>
   
   ```
4. Run the following OpenSSL command in the `Certificates` folder to generate the key and certificate:
   ```bash
   openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout private_key.pem \
    -out cert_chain.pem \
    -config server.cnf -extensions req_ext
    ```
5. Restart your Satisfactory Dedicated Server to use the new certificate.

✅ After this setup your client can connect securely without using skipSSLVerification,
and you keep the full security benefits of TLS while still working locally.

</details>

---

### [Health Check](/docs/api/classes/SatisfactoryApi#healthcheck)

The **health check** verifies that your server is online and responding.

```ts
const health = await api.healthCheck();
if (health.success) {
  console.log('Server is online');
} else {
  console.error('Server unreachable:', health.message);
}
```

* Returns `success: true` if the server responded, otherwise `success: false` with an error message.
* Optionally provide custom client data or increase retries if needed.

> ✅ Quick way to confirm the server is reachable before performing other actions.

---

### Authentication

The API requires authentication for most actions. You can log in using **passwordless** or **password-based** methods.

#### [Passwordless Login](/docs/api/classes/SatisfactoryApi#passwordlesslogin)

```ts
await api.passwordlessLogin(MinimumPrivilegeLevel.ADMINISTRATOR);
```

* Logs in without a password.
* Returns an authentication token stored automatically.
* Use `MinimumPrivilegeLevel` to request permissions (e.g., `ADMINISTRATOR`).

#### [Password Login](/docs/api/classes/SatisfactoryApi#passwordlogin)

```ts
await api.passwordLogin(MinimumPrivilegeLevel.ADMINISTRATOR, 'myAdminPassword');
```

* Logs in with a password.
* Returns and stores an authentication token.
* Useful when passwordless login is not enabled.

> ✅ After login, your API client can perform authenticated actions like managing games or server settings.

---

### [Query Server State](/docs/api/classes/SatisfactoryApi#queryserverstate)

Retrieve the current status of your server.

```ts
const state = await api.queryServerState();
console.log(state.data);
```

* Returns info such as number of players online, active sessions, and more.
* Useful to check server status before performing actions.

---

### [Manage Server Options](/docs/api/classes/SatisfactoryApi#applyserveroptions)

Configure your server’s behavior.

```ts
import { ServerOptions, serverOptionsToDict } from 'satisfactory-dedicated-server-api';

const options: ServerOptions = {
  DSAutoPause: true,
  AutosaveInterval: 10,
};

await api.applyServerOptions(options);
```

* `DSAutoPause` pauses the server when no players are connected.
* `AutosaveInterval` sets the save frequency (minutes).
* Other options include `DSAutoSaveOnDisconnect` and `NetworkQuality`.
* `serverOptionsToDict` converts settings to the correct format automatically.

---

### [Advanced Game Settings](/docs/api/classes/SatisfactoryApi#applyadvancedgamesettings)

Customize gameplay rules and player abilities.

```ts
import { AdvancedGameSettings, AdvancedGameSettingsToDict } from 'satisfactory-dedicated-server-api';

const settings: AdvancedGameSettings = {
  GodMode: true,
  NoPower: true,
};

await api.applyAdvancedGameSettings(settings);
```

* `GodMode` makes players invincible.
* `NoPower` disables power requirements for buildings.
* Other options unlock tiers, remove build costs, or enable flight.
* `AdvancedGameSettingsToDict` converts settings to server format.

---

### Game Management

#### [Create a New Game](/docs/api/classes/SatisfactoryApi#createnewgame)

Start a new game session.

```ts
import { NewGameData } from 'satisfactory-dedicated-server-api';

const gameData: NewGameData = {
  SessionName: 'FactoryWorld1',
  MapName: 'Desert',
  AdvancedGameSettings: { GodMode: true },
};

await api.createNewGame(gameData);
```

* `SessionName` is required.
* `MapName` and `StartingLocation` are optional.
* Can include `AdvancedGameSettings` or `CustomOptionsOnlyForModding`.

#### [Save and Load Games](/docs/api/classes/SatisfactoryApi#savegame)

```ts
await api.saveGame('MySave1');
await api.loadGame('MySave1');
```

* `saveGame(saveName)` saves the current state.
* `loadGame(saveName)` loads a previous save.
* Enable advanced settings when loading: `await api.loadGame('MySave1', true);`

> ✅ Useful for testing, backups, or switching sessions.

---

### [Running Commands](/docs/api/classes/SatisfactoryApi#runcommand)

Execute console commands on the server.

```ts
await api.runCommand('GiveAllItems');
```

* Sends commands as if typed in the console.
* Useful for debugging, testing, or giving items.

---

### [Shutdown Server](/docs/api/classes/SatisfactoryApi#shutdown)

Stop the server safely.

```ts
await api.shutdown();
// May restart automatically if configured as a service
```

* Sends a shutdown command.
* Useful for maintenance or updates.

---

## Notes

* All API requests use HTTPS; call `initCertificate()` before any actions.
* `FG.` prefix in settings is applied automatically by utility functions.
* Methods like `uploadSaveGame()` are not implemented yet.
* Use `MinimumPrivilegeLevel` to ensure sufficient permissions.
* Handle errors using `APIError` and `InvalidParameterError`.

---

## Next Steps

* Explore the full API in [API Reference](/docs/api/README.md).
* Combine `ServerOptions` and `AdvancedGameSettings` for custom setups.
* Handle failures programmatically using error classes. Learn more in the [Error Handling Guid](/docs/guides/02-error-handling.md).

