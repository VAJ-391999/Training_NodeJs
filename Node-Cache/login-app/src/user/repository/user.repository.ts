import { Types } from "mongoose";
import { User, UserModel } from "../../db/mongodb/model/user.model";
import { IRegistrationRequest } from "../../registration/interface/registration.request";

export const getByEmail = async (email: string): Promise<User> => {
  return await UserModel.findOne({ email });
};

export const getUserById = async (userId: Types.ObjectId) => {
  return await UserModel.findById({ _id: userId }, { password: 0 });
};

export const createUser = async (user: IRegistrationRequest) => {
  return await UserModel.create(user);
}
