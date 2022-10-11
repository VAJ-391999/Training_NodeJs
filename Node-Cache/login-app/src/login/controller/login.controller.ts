import { Request, Response } from "express";
import { ILoginRequest } from "../interface/login.request";
import * as loginService from "../service/login.service";
import { validate } from "class-validator";
import { LoginRequestDTO } from "../validators/login-request.validator";
import { HttpError } from "../../httpError/httpError";

export const loginUser = async (
  request: Request,
  response: Response,
  next: any
) => {
  console.log("Login");
  const { email, password } = request.body as ILoginRequest;
  let user = new LoginRequestDTO();
  user.email = email;
  user.password = password;
  try {
    const errors = await validate(user);
    const errorList: string[] = [];
    errors.map((error) => {
      const constraints = error.constraints;

      errorList.push(...Object.values(constraints));
    });
    console.log("Validation Error", errorList);
    if (errors.length > 0) {
      throw new HttpError({
        statusCode: 400,
        message: JSON.stringify(errorList),
        name: "ValidationError",
      });
    }
    const token = await loginService.loginUser({
      email,
      password,
    });
    response.status(200).json({ token });
  } catch (error: any) {
    response.status(error.statusCode).json(error.message);
  }
  next();
};
