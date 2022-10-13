import { TopicArnCommon } from "./topicArn.common";

export interface EmailSubscribeRequest extends TopicArnCommon {
    emailAddress: string
}