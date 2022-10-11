import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ILoginRequest } from "../interface/login.request";

export class LoginRequestDTO implements ILoginRequest {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    @Matches(RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,16}$'), {
        message: "Password should contain at least 1 Uppercase, 1 Lowercase, 1 digit, 1 Special character"
    })
    password: string;

}