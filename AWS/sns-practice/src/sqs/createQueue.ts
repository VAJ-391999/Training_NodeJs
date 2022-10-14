import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { Response } from "../common/response/interface/response";
import { responseHandler } from "../common/response/responseHandler";
import { SQS } from "../common/sqs/sqs";
import { CreateQueueRequest } from "./interface/createQueue.request";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log("CreateQueue");

  const createQueueReq = JSON.parse(event!.body!) as CreateQueueRequest;
  let response: Response;
  try {
    const sqs = new SQS();

    const data = await sqs.createQueue(createQueueReq.queueName);
    response = responseHandler(201, data);
  } catch (error) {
    response = responseHandler(500, error);
  }

  callback(null, response);
};
