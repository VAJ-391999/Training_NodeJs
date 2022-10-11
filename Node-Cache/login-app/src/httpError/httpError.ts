export interface IHttpError {
    statusCode: number,
    message: string
}

export class HttpError extends Error {
    statusCode: number
    message: string
    constructor(httpError: HttpError) {
        super(httpError.message)
        this.statusCode = httpError.statusCode
        this.message = httpError.message
    }
}