import { APIError } from "./APIError";

/**
 * Error thrown when an API request contains an invalid parameter.
 *
 * Extends `APIError` and is used to indicate that one or more parameters
 * provided to a Satisfactory Dedicated Server API method are invalid or malformed.
 *
 * @example
 * ```ts
 * try {
 *   throw new InvalidParameterError("INVALID_MAP_NAME", "The specified map name does not exist.");
 * } catch (err) {
 *   if (err instanceof InvalidParameterError) {
 *     console.error(err.message); // "The specified map name does not exist."
 *   }
 * }
 * ```
 *
 * @extends APIError
 */
export class InvalidParameterError extends APIError {
    constructor(errorCode: string, message: string) {
        super(errorCode, message);
        this.name = "InvalidParameterError";
        Object.setPrototypeOf(this, InvalidParameterError.prototype);
    }
}
