import { Config } from "./interface/config";
import dotenv from 'dotenv';

dotenv.config();

export const config: Config = {
    queueEndpoint: process.env.QUEUE_ENDPOINT || '',
    maxNumberOfMessages: parseInt(process.env.MAX_NUMBER_OF_MESSAGES || '10'),
    accessKeyId: process.env.ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    region: process.env.REGION || ''
}