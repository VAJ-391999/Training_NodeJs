import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { responseHandler } from "../common/response/responseHandler";
import { snsInstance } from "../common/sns/snsInstance";
import { CreateTopicRequest } from "./interface/createTopic.request";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log("CreateTopic");

  const createTopicRequest: CreateTopicRequest = JSON.parse(
    event!.body!
  ) as CreateTopicRequest;

  let response;
  try {
    const sns = snsInstance();

    const data = await sns
      .createTopic({ Name: createTopicRequest.topicName })
      .promise();
    response = responseHandler(201, data);
  } catch (error: any) {
    response = responseHandler(500, error);
  }

  callback(null, response);
};
