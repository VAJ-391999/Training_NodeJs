import { SNS } from "aws-sdk";
import AWS = require("aws-sdk");
import { config } from "../config/config";

let sns: SNS | undefined;

export const snsInstance = (): SNS => {
  if (sns === undefined) {
    console.log("Create new SNS instance");
    sns = new AWS.SNS({
      apiVersion: "2010-03-31",
      endpoint: config.snsEndpoint,
      region: config.region,
    });
  } else if (sns instanceof SNS) {
    console.log("SNS instance already created");
  } else {
    console.log("Error");
  }
  return sns;
};
