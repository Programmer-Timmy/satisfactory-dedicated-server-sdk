/**
 * Represents the minimum privilege level required to access certain API endpoints
 * or perform specific actions on a Satisfactory Dedicated Server.
 *
 * This enum is used to control authorization and ensure that only users or tokens
 * with sufficient privileges can execute restricted operations.
 *
 * @enum {string}
 * @property NOT_AUTHENTICATED - Represents an unauthenticated user.
 * @property CLIENT - Standard client-level access.
 * @property ADMINISTRATOR - Full administrator privileges.
 * @property INITIAL_ADMIN - The first admin created during server setup.
 * @property API_TOKEN - Access granted via an API token.
 *
 * @example
 * ```ts
 * function checkAccess(level: MinimumPrivilegeLevel) {
 *   if (level === MinimumPrivilegeLevel.ADMINISTRATOR) {
 *     console.log("Admin access granted");
 *   }
 * }
 * ```
 */
export enum MinimumPrivilegeLevel {
    NOT_AUTHENTICATED = "NotAuthenticated",
    CLIENT = "Client",
    ADMINISTRATOR = "Administrator",
    INITIAL_ADMIN = "InitialAdmin",
    API_TOKEN = "APIToken",
}
