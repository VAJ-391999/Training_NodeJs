import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { snsInstance } from "../common/snsInstance";
import { PublishRequest } from "./interface/publish.request";

export const handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const publishRequest: PublishRequest = JSON.parse(event!.body!);

  const sns = snsInstance();

  sns
    .publish({
      TopicArn: publishRequest.topicArn,
      Message: publishRequest.message,
    })
    .promise()
    .then((data) => {
      console.log("Data", data);
      // callback(null, )
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
