import { User } from "../../db/mongodb/model/user.model";

export type IRegistrationResponse = Omit<User, 'password'>;