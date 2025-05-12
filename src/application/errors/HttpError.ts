export class HttpError extends Error {
    constructor(
    public readonly statusCode: number,
    message?: Record<string, unknown> | string,
    ){
        super(message instanceof Object ? JSON.stringify(message) : message)
        this.name = "HttpError"
    }
}
