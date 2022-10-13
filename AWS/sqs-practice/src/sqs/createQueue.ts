import AWS from "aws-sdk";
import { sqsInstance } from "../common/sqsInstance";

export const createQueue = async (event: any, context: any, callback: any) => {

  // Create an SQS service object
  const sqs = sqsInstance()

  var params = {
    QueueName: "demo-queue",
  };
  sqs.createQueue(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data.QueueUrl);
    }
  });

  const queues = await sqs.listQueues().promise();
  console.log(queues);

};
