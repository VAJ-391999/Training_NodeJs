import { HttpError } from "../../httpError";

export const GENERAL_HTTP_ERRORS: Record<string, HttpError> = {
    InternalServerError: {
        statusCode: 500,
        message: "Internal server error", 
        name: "InternalServerError"
    }
}