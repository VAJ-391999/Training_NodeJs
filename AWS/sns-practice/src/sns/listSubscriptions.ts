import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { snsInstance } from "../common/snsInstance";
import { ListSubscriptionsRequest } from "./interface/listSubscriptions.request";

export const handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const listSubscriptionsReq: ListSubscriptionsRequest = JSON.parse(
    event!.body!
  ) as ListSubscriptionsRequest;

  const sns = snsInstance();

  sns
    .listSubscriptionsByTopic({
      TopicArn: listSubscriptionsReq.topicArn,
    })
    .promise()
    .then((data) => {
      console.log("Data", data);
      callback(null, data);
    })
    .catch((error) => {
      console.log("Error", error);
      callback(null, error);
    });
};
