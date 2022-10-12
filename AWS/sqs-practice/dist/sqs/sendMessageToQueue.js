"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToQueue = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const SendMessageToQueue = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body);
    aws_sdk_1.default.config.update({ region: "REGION" });
    const sqs = new aws_sdk_1.default.SQS({
        apiVersion: "2012-11-05",
        endpoint: "http://localhost:9324",
        accessKeyId: "na",
        secretAccessKey: "na",
        region: "eu-west-1",
    });
    const params = {
        QueueUrl: body.queueUrl,
        MessageBody: body.messageBody
    };
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.log("Error", err);
            callback("error", JSON.stringify(err));
        }
        else {
            console.log("Success", data);
            callback(null, JSON.stringify(data));
        }
    });
};
exports.SendMessageToQueue = SendMessageToQueue;
