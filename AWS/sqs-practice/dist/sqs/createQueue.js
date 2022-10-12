"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueue = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const createQueue = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    aws_sdk_1.default.config.update({ region: "REGION" });
    // Create an SQS service object
    const sqs = new aws_sdk_1.default.SQS({
        apiVersion: "2012-11-05",
        endpoint: "http://localhost:9324",
        accessKeyId: "na",
        secretAccessKey: "na",
        region: "eu-west-1",
    });
    var params = {
        QueueName: "demo-queue",
    };
    sqs.createQueue(params, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data.QueueUrl);
        }
    });
    // const params = {
    //   // Remove DelaySeconds parameter and value for FIFO queues
    //   DelaySeconds: 10,
    //   MessageAttributes: {
    //     Title: {
    //       DataType: "String",
    //       StringValue: "The Whistler",
    //     },
    //     Author: {
    //       DataType: "String",
    //       StringValue: "John Grisham",
    //     },
    //     WeeksOn: {
    //       DataType: "Number",
    //       StringValue: "6",
    //     },
    //   },
    //   MessageBody:
    //     "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    //   // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    //   // MessageGroupId: "Group1",  // Required for FIFO queues
    //   QueueUrl: "http://localhost:9324/sqs/DemoQueue"
    // };
    const queues = yield sqs.listQueues().promise();
    console.log(queues);
    // sqs.sendMessage(params, function (err, data) {
    //   if (err) {
    //     console.log("Error", err);
    //   } else {
    //     console.log("Success", data.MessageId);
    //   }
    // });
});
exports.createQueue = createQueue;
