/**
 * Base error class for all Satisfactory Dedicated Server API errors.
 *
 * Encapsulates an `errorCode` and a descriptive message. All custom API errors
 * (like `InvalidParameterError`) extend this class to provide consistent error handling.
 *
 * @example
 * ```ts
 * try {
 *   throw new APIError("SERVER_OFFLINE", "The server is not reachable.");
 * } catch (err) {
 *   if (err instanceof APIError) {
 *     console.error(err.toString()); // "SERVER_OFFLINE: The server is not reachable."
 *   }
 * }
 * ```
 */
export class APIError extends Error {
    errorCode: string;
    message: string;

    /**
     * Creates a new `APIError`.
     *
     * @param errorCode - A unique identifier for the error type.
     * @param message - A human-readable description of the error.
     */
    constructor(errorCode: string, message: string) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
        this.name = "APIError";
        Object.setPrototypeOf(this, APIError.prototype); // Fix prototype chain for built-in Error
    }

    /**
     * Converts the error to a dictionary suitable for JSON serialization.
     *
     * @returns An object with `error_code` and `message` properties.
     *
     * @example
     * ```ts
     * const err = new APIError("INVALID_PARAM", "Parameter X is invalid");
     * console.log(err.toDict());
     * // Output: { error_code: "INVALID_PARAM", message: "Parameter X is invalid" }
     * ```
     */
    toDict() {
        return {
            error_code: this.errorCode,
            message: this.message,
        };
    }

    /**
     * Returns a human-readable string representation of the error.
     *
     * @returns A string in the format `ERROR_CODE: message`.
     */
    toString() {
        return `${this.errorCode}: ${this.message}`;
    }
}
