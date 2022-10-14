import * as AWS from "aws-sdk";
import { config } from "../../config/config";

export class SQS {
  private sqsInstance: AWS.SQS;

  createInstance = async () => {
    return new AWS.SQS({
      apiVersion: "2012-11-05",
      endpoint: config.sqs.endPoint,
      accessKeyId: config.sqs.accessKeyId,
      secretAccessKey: config.sqs.secretAccessKey,
      region: config.region,
    });
  };

  createQueue = async (queueName: string) => {
    if (!this.sqsInstance) {
      this.sqsInstance = await this.createInstance();
    }

    const newQueue = await this.sqsInstance
      .createQueue({
        QueueName: queueName,
      })
      .promise();

    return newQueue;
  };

  receiveMessage = async (queueUrl: string) => {
    if (!this.sqsInstance) {
      this.sqsInstance = await this.createInstance();
    }

    const data = await this.sqsInstance
      .receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: config.sqs.maxNumberOfMessages,
        VisibilityTimeout: config.sqs.visibilityTimeout,
      })
      .promise();

    return data;
  };
}
