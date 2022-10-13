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
exports.createQueue = void 0;
const sqsInstance_1 = require("../common/sqsInstance");
const createQueue = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    // Create an SQS service object
    const sqs = (0, sqsInstance_1.sqsInstance)();
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
    const queues = yield sqs.listQueues().promise();
    console.log(queues);
});
exports.createQueue = createQueue;
