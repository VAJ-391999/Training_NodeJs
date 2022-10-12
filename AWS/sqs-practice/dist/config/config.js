"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    queueEndpoint: process.env.QUEUE_ENDPOINT || '',
    maxNumberOfMessages: parseInt(process.env.MAX_NUMBER_OF_MESSAGES || '10'),
    accessKeyId: process.env.ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    region: process.env.REGION || ''
};
