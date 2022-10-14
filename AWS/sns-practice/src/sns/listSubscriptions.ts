import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { responseHandler } from "../common/response/responseHandler";
import { snsInstance } from "../common/sns/snsInstance";
import { ListSubscriptionsRequest } from "./interface/listSubscriptions.request";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log("ListSubscriptions");

  const listSubscriptionsReq: ListSubscriptionsRequest = JSON.parse(
    event!.body!
  ) as ListSubscriptionsRequest;

  let response;

  try {
    const sns = snsInstance();

    const data = await sns
      .listSubscriptionsByTopic({
        TopicArn: listSubscriptionsReq.topicArn,
      })
      .promise();
    response = responseHandler(200, data);
  } catch (error: any) {
    response = responseHandler(500, error);
  }

  callback(null, response);
};
