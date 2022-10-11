"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueHandler = void 0;
const queueHandler = (event) => {
    console.log(`Processing data from queue with records ${JSON.stringify(event.Records)}`);
};
exports.queueHandler = queueHandler;
