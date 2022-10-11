import mongoose from "mongoose"
import { HttpError } from "../httpError/httpError"
import { USER_HTTP_ERRORS } from "../httpError/httpErrorList/user/user.error"

export const validObjectId = (id: string) => {
    try{
        return new mongoose.Types.ObjectId(id)
    } catch(error) {
        throw new HttpError(USER_HTTP_ERRORS.NotValidObjectId)
    }
}