"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueueRecords = void 0;
const getQueueRecords = (event) => {
    console.log(`Processing data from queue with records ${JSON.stringify(event.Records)}`);
};
exports.getQueueRecords = getQueueRecords;
