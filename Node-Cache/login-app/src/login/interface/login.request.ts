import { User } from "../../db/mongodb/model/user.model";

export type ILoginRequest = Pick<User, 'email' | 'password'>