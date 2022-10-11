import { HttpError } from "../../httpError";

export const USER_HTTP_ERRORS: Record<string, HttpError> = {
    NotFound: {
        statusCode: 404,
        message: "User not found", 
        name: "UserNotFound"
    },
    PasswordNotMatch: {
        statusCode: 401,
        message: "Email and password not matched", 
        name: "PasswordNotMatch"
    },
    NotValidObjectId: {
        statusCode: 400,
        message: "Given user id is not a valid object id",
        name: "NotValidObjectId"
    },
    UserAlreadyExist: {
        statusCode: 400,
        message: "User already exist with this email",
        name: "UserAlreadyExist"
    }
}