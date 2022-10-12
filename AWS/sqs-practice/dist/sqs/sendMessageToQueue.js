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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageToQueue = void 0;
const sqsInstance_1 = require("../common/sqsInstance");
const SendMessageToQueue = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body);
    const sqs = (0, sqsInstance_1.sqsInstance)();
    const params = {
        DelaySeconds: 0,
        QueueUrl: body.queueUrl,
        MessageBody: body.messageBody
    };
    try {
        yield sqs.sendMessage(params).promise();
    }
    catch (error) {
        console.log("Error", error);
    }
});
exports.SendMessageToQueue = SendMessageToQueue;
