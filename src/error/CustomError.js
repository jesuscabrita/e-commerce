export class CustomError {
    constructor(name, message, cause) {
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
    static generateCustomError(name, message, cause) {
        return new CustomError(name, message, cause);
    }
}