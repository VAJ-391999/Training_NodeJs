import { TopicArnCommon } from "./topicArn.common";

export interface PublishRequest extends TopicArnCommon {
    message: string
}