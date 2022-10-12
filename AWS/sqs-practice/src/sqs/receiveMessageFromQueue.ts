import { Callback, Context, SQSEvent } from "aws-lambda";

export const ReceiveMessageFromQueue = (event: SQSEvent, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

}