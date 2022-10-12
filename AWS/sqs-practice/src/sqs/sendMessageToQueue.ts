import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import AWS from "aws-sdk";
import { sqsInstance } from "../common/sqsInstance";
import { config } from "../config/config";
import { SendMessageRequest } from "../interface/sendMessage.request";

export const SendMessageToQueue = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body: SendMessageRequest = JSON.parse(event!.body!) as SendMessageRequest;

  const sqs = sqsInstance()

  const params = {
    DelaySeconds: 0,
    QueueUrl: body.queueUrl,
    MessageBody: body.messageBody
  };

  try {
    await sqs.sendMessage(params).promise();
  } catch (error) {
    console.log("Error", error)
  }
};
