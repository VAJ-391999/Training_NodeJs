import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IRegistrationRequest } from "../interface/registration.request";


export class RegistrationRequestDTO implements IRegistrationRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

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