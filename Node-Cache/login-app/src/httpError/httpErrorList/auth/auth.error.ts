import { HttpError } from "../../httpError";

export const AUTH_HTTP_ERRORS: Record<string, HttpError> = {
    TokenNotProvided: {
        statusCode: 401,
        message: "Token not provided", 
        name: "TokenNotProvided"
    },
    TokenNotValid: {
        statusCode: 401,
        message: "Token is not valid", 
        name: "TokenNotValid"
    }
}