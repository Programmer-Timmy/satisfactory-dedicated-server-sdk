export class APIError extends Error {
    errorCode: string;
    message: string;

    constructor(errorCode: string, message: string) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
        this.name = "APIError";
        Object.setPrototypeOf(this, APIError.prototype); // Fix prototype chain for built-in Error
    }

    toDict() {
        return {
            error_code: this.errorCode,
            message: this.message,
        };
    }

    toString() {
        return `${this.errorCode}: ${this.message}`;
    }
}