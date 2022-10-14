import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { SubscribeProtocol } from "../../common/sns/subscribeProtocol";
import { SubscribeRequest } from "../interface/subscribe.request";

export class SubscribeRequestDto implements SubscribeRequest {
  @IsEnum(SubscribeProtocol)
  protocol: SubscribeProtocol;

  @IsString()
  endpoint: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  topicArn: string;
}
