import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { Response } from "../common/response/interface/response";
import { responseHandler } from "../common/response/responseHandler";
import { snsInstance } from "../common/sns/snsInstance";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log("ListTopics");
  let response: Response;
  try {
    const sns = snsInstance();

    const data = await sns.listTopics({}).promise();

    response = responseHandler(200, data);
  } catch (error) {
    response = responseHandler(500, error);
  }

  callback(null, response);
};
