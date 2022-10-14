import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { validate } from "class-validator";
import { HttpError } from "../common/error/httpError";
import { Response } from "../common/response/interface/response";
import { responseHandler } from "../common/response/responseHandler";
import { snsInstance } from "../common/sns/snsInstance";
import { SubscribeRequestDto } from "./dto/subscribeRequest.dto";
import { SubscribeRequest } from "./interface/subscribe.request";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log("Subscribe");

  const subscribeReq: SubscribeRequest = JSON.parse(
    event!.body!
  ) as SubscribeRequest;

  const validateReq = new SubscribeRequestDto();

  validateReq.protocol = subscribeReq.protocol;
  validateReq.topicArn = subscribeReq.topicArn;
  validateReq.endpoint = subscribeReq.endpoint;

  let response: Response;
  try {
    const errors = await validate(validateReq);
    const errorList: string[] = [];
    if (errors.length > 0) {
      console.log("Error", errors);
      errors.map((error) => {
        const constraints = error.constraints!;
        errorList.push(...Object.values(constraints));
      });
      throw new HttpError(400, errorList);
    }

    const sns = snsInstance();

    const data = await sns
      .subscribe({
        Protocol: subscribeReq.protocol,
        TopicArn: subscribeReq.topicArn,
        Endpoint: subscribeReq.endpoint,
      })
      .promise();

    response = responseHandler(200, data);
  } catch (error) {
    if (error instanceof HttpError) {
      response = responseHandler(error.statusCode, error.data);
    } else {
      response = responseHandler(500, error);
    }
  }
  callback(null, response);
};
