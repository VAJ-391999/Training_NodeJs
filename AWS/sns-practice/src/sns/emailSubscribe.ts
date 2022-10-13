import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { validate } from "class-validator";
import { snsInstance } from "../common/snsInstance";
import { SubscribeProtocol } from "../common/subscribeProtocol";
import { EmailSubscribeRequestDto } from "./dto/emailSubscribeRequest.dto";
import { EmailSubscribeRequest } from "./interface/emailSubscribe.request";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const emailSubscribeReq: EmailSubscribeRequest = JSON.parse(
    event!.body!
  ) as EmailSubscribeRequest;

  const validateReq = new EmailSubscribeRequestDto();

  validateReq.emailAddress = emailSubscribeReq.emailAddress;
  validateReq.topicArn = emailSubscribeReq.topicArn;

  const errors = await validate(validateReq);

  if (errors.length > 0) {
    console.log("Error", errors);
    return;
  }

  const sns = snsInstance();

  sns
    .subscribe({
      Protocol: SubscribeProtocol.EMAIL,
      TopicArn: emailSubscribeReq.topicArn,
      Endpoint: emailSubscribeReq.emailAddress,
    })
    .promise()
    .then((data) => {
      console.log("Data", data);
      callback(null, "Success");
    })
    .catch((error) => {
      console.log("Error", error);
      callback(null, "Error");
    });
};
