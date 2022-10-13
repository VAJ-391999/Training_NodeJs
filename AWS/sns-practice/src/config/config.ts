import * as dotenv from 'dotenv';
import { Config } from './interface/config';

dotenv.config();

export const config: Config = {
    snsEndpoint: process.env.SNS_ENDPOINT || '',
    region: process.env.REGION || ''
}