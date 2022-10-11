import { validate } from "class-validator";
import { Request, Response } from "express";
import { HttpError } from "../../httpError/httpError";
import { IRegistrationRequest } from "../interface/registration.request";
import * as registrationService from "../service/registration.service";
import { RegistrationRequestDTO } from "../validators/registration-request.validator";

export const registerUser = async (
  request: Request,
  response: Response,
  next: any
) => {
  console.log("Registration");
  const { name, email, password } = request.body as IRegistrationRequest;
  let newUser = new RegistrationRequestDTO();
  newUser.name = name;
  newUser.email = email;
  newUser.password = password;
  try {
    const errors = await validate(newUser);
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
    const user = await registrationService.registerUser({
      name,
      email,
      password,
    });
    response.status(201).json(user);
  } catch (error: any) {
    response.status(error.statusCode).json(error.message)
  }
  next();
};
