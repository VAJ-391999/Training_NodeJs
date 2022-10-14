import * as dotenv from "dotenv";
import { Config } from "./interface/config";

dotenv.config();

export const config: Config = {
  region: process.env.REGION || "",
  sns: {
    endPoint: process.env.SNS_ENDPOINT || "",
  },
  sqs: {
    endPoint: process.env.QUEUE_ENDPOINT || "",
    maxNumberOfMessages: parseInt(
      process.env.QUEUE_MAX_NUMBER_OF_MESSAGES || "10"
    ),
    accessKeyId: process.env.QUEUE_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.QUEUE_SECRET_ACCESS_KEY || "",
    visibilityTimeout: parseInt(process.env.QUEUE_VISIBILITY_TIMEOUT || ""),
  },
};
