import AWS, { SQS } from "aws-sdk";
import { config } from "../config/config";
let sqs: SQS;

export const sqsInstance = (): SQS => {
  if (!sqs) {
    console.log("Create SQS instance");
    sqs = new AWS.SQS({
      apiVersion: "2012-11-05",
      endpoint: config.queueEndpoint,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
    });
  }
  return sqs;
};
