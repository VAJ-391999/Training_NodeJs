import { Request, Response } from "express";
import { Types } from "mongoose";
import { IJWTPayload } from "../../auth/interface/auth";
import { validObjectId } from "../../utils/common";
import * as userService from '../service/user.service';

export const getUser = async (request: any, response: Response, next: any) => {
  console.log("Get user")
  const payload = request.decoded as IJWTPayload;
  console.log(`UserId: ${payload._id}`)

  try {
    const id: Types.ObjectId = validObjectId(payload._id);
    const foundUser = await userService.getUser(id);
    response.status(200).json(foundUser)
  } catch(error: any) {
    console.log("error", error)
    response.status(error.statusCode).json(error.message)
  }
  next();
};
