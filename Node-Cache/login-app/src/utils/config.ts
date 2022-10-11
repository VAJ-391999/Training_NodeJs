import dotenv from 'dotenv'
import { IConfig } from './interface/config';

dotenv.config();

export const config: IConfig = {
    port: parseInt(process.env.PORT || '4000'),
    mongodbUrl: process.env.MONGO_DB_URL || '',
    saltRound: parseInt(process.env.SALT_ROUND || '10'),
    jwtTokenSecret: process.env.JWT_TOKEN_SECRET || ''
}