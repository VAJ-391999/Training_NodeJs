import { Types } from "mongoose";
import { User } from "../../db/mongodb/model/user.model";
import { redisClient } from "../../db/redis/connection";
import { HttpError } from "../../httpError/httpError";
import { USER_HTTP_ERRORS } from "../../httpError/httpErrorList/user/user.error";
import { IGetUserResponse } from "../interface/get-user.response";
import { getUserById } from "../repository/user.repository";

export const getUser = async (
  userId: Types.ObjectId
): Promise<IGetUserResponse> => {
  console.log("Get user")
  let user: User;
  console.log(
    "TTL",
    await redisClient.ttl("user_list"),
    await redisClient.exists("user_list")
  );
  if ((await redisClient.ttl("user_list")) === -1) {
    await redisClient.expire("user_list", 60);
  }
  try {
    const userList: string[] = await redisClient.lRange("user_list", 0, -1);
    console.log("Existing redis user list", userList);
    if (userList.length > 0) {
      console.log("Find first in existing redis user list");
      const cachedUsersList: User[] = userList.map((cachedUser) =>
        JSON.parse(cachedUser)
      );
      user = cachedUsersList.find(
        (user) => user._id.toString() === userId.toString()
      );
      if (!user) {
        console.log("User not found in existing redis user list");
        user = await findAndAddUserToRedisDB(userId);
      }
    } else {
      console.log("Create new user list in redis");
      user = await findAndAddUserToRedisDB(userId);
    }
    return user;
  } catch (error: any) {
    console.log("Error: ", error);
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

const findAndAddUserToRedisDB = async (
  userId: Types.ObjectId
): Promise<User> => {
  const user: User = await getUserById(userId);
  if (!user) {
    throw new HttpError(USER_HTTP_ERRORS.NotFound);
  }
  console.log(user);
  await redisClient.rPush("user_list", JSON.stringify(user));
  return user;
};
