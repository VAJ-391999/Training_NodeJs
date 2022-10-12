import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import AWS from "aws-sdk";
import { sqsInstance } from "../common/sqsInstance";
import { config } from "../config/config";
import { ReceiveMessageRequest } from "../interface/receiveMessage.request";

export const ReceiveMessageFromQueue = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body: ReceiveMessageRequest = JSON.parse(
    event!.body!
  ) as ReceiveMessageRequest;

  const sqs = sqsInstance()

  const params = {
    QueueUrl: body.queueUrl,
    MaxNumberOfMessages: config.maxNumberOfMessages,
    VisibilityTimeout: 5
  };

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      callback("Error", JSON.stringify(err));
    } else if (data.Messages) {
      const deleteParams = {
        QueueUrl: body.queueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle ?? "",
      };
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
      console.log("Data", data);
      callback(null, JSON.stringify(data));
    }
  });
};
