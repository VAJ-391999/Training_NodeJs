import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { EmailSubscribeRequest } from "../interface/emailSubscribe.request";

export class EmailSubscribeRequestDto implements EmailSubscribeRequest {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    topicArn: string;

    @IsString()
    @IsEmail()
    emailAddress: string;
}