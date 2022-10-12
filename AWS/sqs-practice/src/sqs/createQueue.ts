import AWS from "aws-sdk";

export const createQueue = async (event: any, context: any, callback: any) => {
  AWS.config.update({ region: "REGION" });

  // Create an SQS service object
  const sqs = new AWS.SQS({
    apiVersion: "2012-11-05",
    endpoint: "http://localhost:9324",
    accessKeyId: "na",
    secretAccessKey: "na",
    region: "eu-west-1",
  });

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

  // const params = {
  //   // Remove DelaySeconds parameter and value for FIFO queues
  //   DelaySeconds: 10,
  //   MessageAttributes: {
  //     Title: {
  //       DataType: "String",
  //       StringValue: "The Whistler",
  //     },
  //     Author: {
  //       DataType: "String",
  //       StringValue: "John Grisham",
  //     },
  //     WeeksOn: {
  //       DataType: "Number",
  //       StringValue: "6",
  //     },
  //   },
  //   MessageBody:
  //     "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  //   // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  //   // MessageGroupId: "Group1",  // Required for FIFO queues
  //   QueueUrl: "http://localhost:9324/sqs/DemoQueue"
  // };

  const queues = await sqs.listQueues().promise();
  console.log(queues);

  // sqs.sendMessage(params, function (err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log("Success", data.MessageId);
  //   }
  // });
};
