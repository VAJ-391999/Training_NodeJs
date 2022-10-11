import { HttpError } from "../../httpError/httpError";
import { USER_HTTP_ERRORS } from "../../httpError/httpErrorList/user/user.error";
import { getByEmail } from "../../user/repository/user.repository";
import { ILoginRequest } from "../interface/login.request";
import bcrypt from "bcrypt";
import { generateToken } from "../../auth/auth";
import { GENERAL_HTTP_ERRORS } from "../../httpError/httpErrorList/general/general.error";

export const loginUser = async (loginUserData: ILoginRequest) => {
  console.log("Login service")
  try {
    const foundUser = await getByEmail(loginUserData.email);
    console.log("User from database", foundUser);
    if (!foundUser) {
      throw new HttpError(USER_HTTP_ERRORS.NotFound);
    }

    const isPasswordMatched = await bcrypt.compare(
      loginUserData.password,
      foundUser.password
    );

    if (!isPasswordMatched) {
      throw new HttpError(USER_HTTP_ERRORS.PasswordNotMatch);
    }

    const token: string = generateToken({
      _id: foundUser._id.toString(),
      email: foundUser.email,
    });
    return token;
  } catch (error: any) {
    console.log("Error", error);
    if (error instanceof HttpError) {
      throw error;
    } else {
      throw new HttpError({
        statusCode: 500,
        message: error.message,
        name: error.message,
      });
    }
  }
};
