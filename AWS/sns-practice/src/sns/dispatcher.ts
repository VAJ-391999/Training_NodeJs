import { SNSEvent } from "aws-lambda"

export const handler = (event: SNSEvent) => {
    console.log("Event", event)
}