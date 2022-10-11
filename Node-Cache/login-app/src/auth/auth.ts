import { IJWTPayload } from "./interface/auth";
import jwt from 'jsonwebtoken';
import { config } from "../utils/config";
import { HttpError } from "../httpError/httpError";
import { AUTH_HTTP_ERRORS } from "../httpError/httpErrorList/auth/auth.error";

export const generateToken = (payload: IJWTPayload) => {
    return jwt.sign(payload, config.jwtTokenSecret)
}

export const verifyToken = (request: any, response: any, next: any) => {
    let token: string;
    try {
        if (!request.headers || !request.headers.authorization) {
            throw new HttpError(AUTH_HTTP_ERRORS.TokenNotProvided)
        }
        token = request.headers.authorization
        jwt.verify(token, config.jwtTokenSecret, (err, decoded) => {
            console.log("Decoded data", decoded);
            request.decoded = decoded
        })
    } catch (error: any) {
        response.status(error.statusCode).json(error.message)
    }
   next();
}