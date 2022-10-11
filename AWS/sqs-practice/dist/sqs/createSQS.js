"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSQS = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const createSQS = (event, context, callback) => {
    aws_sdk_1.default.config.update({ region: "REGION" });
    // Create an SQS service object
    const sqs = new aws_sdk_1.default.SQS({ apiVersion: "2012-11-05" });
    const params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        DelaySeconds: 10,
        MessageAttributes: {
            Title: {
                DataType: "String",
                StringValue: "The Whistler",
            },
            Author: {
                DataType: "String",
                StringValue: "John Grisham",
            },
            WeeksOn: {
                DataType: "Number",
                StringValue: "6",
            },
        },
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: "http://localhost:9324"
    };
    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data.MessageId);
        }
    });
};
exports.createSQS = createSQS;
