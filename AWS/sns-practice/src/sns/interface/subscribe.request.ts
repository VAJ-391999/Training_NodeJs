import { SubscribeProtocol } from "../../common/sns/subscribeProtocol";
import { TopicArnCommon } from "./topicArn.common";

export interface SubscribeRequest extends TopicArnCommon {
  protocol: SubscribeProtocol;
  endpoint: string;
}
