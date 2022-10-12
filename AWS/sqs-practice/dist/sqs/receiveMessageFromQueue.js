"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveMessageFromQueue = void 0;
const sqsInstance_1 = require("../common/sqsInstance");
const config_1 = require("../config/config");
const ReceiveMessageFromQueue = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body);
    const sqs = (0, sqsInstance_1.sqsInstance)();
    const params = {
        QueueUrl: body.queueUrl,
        MaxNumberOfMessages: config_1.config.maxNumberOfMessages,
        VisibilityTimeout: 5
    };
    sqs.receiveMessage(params, (err, data) => {
        var _a;
        if (err) {
            console.log("Error", err);
            callback("Error", JSON.stringify(err));
        }
        else if (data.Messages) {
            const deleteParams = {
                QueueUrl: body.queueUrl,
                ReceiptHandle: (_a = data.Messages[0].ReceiptHandle) !== null && _a !== void 0 ? _a : "",
            };
            sqs.deleteMessage(deleteParams, function (err, data) {
                if (err) {
                    console.log("Delete Error", err);
                }
                else {
                    console.log("Message Deleted", data);
                }
            });
            console.log("Data", data);
            callback(null, JSON.stringify(data));
        }
    });
};
exports.ReceiveMessageFromQueue = ReceiveMessageFromQueue;
