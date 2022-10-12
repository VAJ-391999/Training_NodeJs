import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import AWS from "aws-sdk";
import { SendMessageRequest } from "../interface/sendMessage.request";

export const SendMessageToQueue = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body: SendMessageRequest = JSON.parse(event!.body!) as SendMessageRequest;

  AWS.config.update({ region: "REGION" });

  const sqs = new AWS.SQS({
    apiVersion: "2012-11-05",
    endpoint: "http://localhost:9324",
    accessKeyId: "na",
    secretAccessKey: "na",
    region: "eu-west-1",
  });

  const params = {
    QueueUrl: body.queueUrl,
    MessageBody: body.messageBody
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
        console.log("Error", err)
        callback("error", JSON.stringify(err))
    } else {
        console.log("Success", data)
        callback(null, JSON.stringify(data))
    }
  })
};
