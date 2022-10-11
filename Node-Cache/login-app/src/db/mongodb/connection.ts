import mongoose from "mongoose";
import { config } from "../../utils/config";

export const mongoDBConnection = async () => {
    try {
        await mongoose.connect(config.mongodbUrl)
        console.log("Mongo DB database connected")
    } catch (error) {
        console.log("Mongo DB database connection fail", error)
    }
}