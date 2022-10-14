import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { Response } from "../common/response/interface/response";
import { responseHandler } from "../common/response/responseHandler";
import { SQS } from "../common/sqs/sqs";
import { ReceiveMessagesFromQueueRequest } from "./interface/receiveMessagesFromQueue.request";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log("ReceiveMessagesFromQueue");

  const receiveMessagesFromQueueReq = JSON.parse(
    event!.body!
  ) as ReceiveMessagesFromQueueRequest;
  let response: Response;
  try {
    const sqs = new SQS();

    const data = await sqs.receiveMessage(receiveMessagesFromQueueReq.queueUrl);
    response = responseHandler(201, data);
  } catch (error) {
    response = responseHandler(500, error);
  }

  callback(null, response);
};
