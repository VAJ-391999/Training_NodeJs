import { User } from "../../db/mongodb/model/user.model";

export type IGetUserResponse = Omit<User, 'password'>;