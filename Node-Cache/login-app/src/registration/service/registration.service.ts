import { User, UserModel } from "../../db/mongodb/model/user.model";
import { IRegistrationRequest } from "../interface/registration.request";
import bcrypt from "bcrypt";
import { config } from "../../utils/config";
import { IRegistrationResponse } from "../interface/registration.response";
import { getByEmail } from "../../user/repository/user.repository";
import { HttpError } from "../../httpError/httpError";
import { USER_HTTP_ERRORS } from "../../httpError/httpErrorList/user/user.error";
import { createUser } from "../../user/repository/user.repository";
import { omit, omitBy } from "lodash";

export const registerUser = async (
  userData: IRegistrationRequest
): Promise<IRegistrationResponse> => {
  console.log("Registration service");
  try {
    const foundUser = await getByEmail(userData.email);
    if (foundUser) {
      throw new HttpError(USER_HTTP_ERRORS.UserAlreadyExist);
    }
    const newUserData = {
      ...userData,
      password: await bcrypt.hash(userData.password, config.saltRound),
    };
    const newUser: User = await createUser(newUserData);
    const userResponse: User = { ...JSON.parse(JSON.stringify(newUser)) }
    console.log("New created user", userResponse);
    return omit(userResponse, ["password"]);
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
