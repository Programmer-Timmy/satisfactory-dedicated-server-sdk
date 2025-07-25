import {APIError} from "./APIError";

export class InvalidParameterError extends APIError {
    constructor(errorCode: string, message: string) {
        super(errorCode, message);
        this.name = "InvalidParameterError";
        Object.setPrototypeOf(this, InvalidParameterError.prototype);
    }
}