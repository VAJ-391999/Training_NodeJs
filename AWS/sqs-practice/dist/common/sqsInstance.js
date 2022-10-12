"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsInstance = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config/config");
let sqs;
const sqsInstance = () => {
    if (!sqs) {
        console.log("Create SQS instance");
        sqs = new aws_sdk_1.default.SQS({
            apiVersion: "2012-11-05",
            endpoint: config_1.config.queueEndpoint,
            accessKeyId: config_1.config.accessKeyId,
            secretAccessKey: config_1.config.secretAccessKey,
            region: config_1.config.region,
        });
    }
    return sqs;
};
exports.sqsInstance = sqsInstance;
