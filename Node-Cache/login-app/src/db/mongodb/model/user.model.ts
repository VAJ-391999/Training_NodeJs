import { getModelForClass, prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { Types } from "mongoose";

export class User extends TimeStamps implements Base {
    _id: Types.ObjectId;
    id: string;
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    email: string

    @prop({ required: true })
    password: string
}

export const UserModel = getModelForClass(User);

