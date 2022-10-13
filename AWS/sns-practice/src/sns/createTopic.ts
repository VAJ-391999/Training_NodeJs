import { APIGatewayEvent, Callback, Context } from 'aws-lambda'
import { snsInstance } from '../common/snsInstance'
import { CreateTopicRequest } from './interface/createTopic.request';

export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {

    const createTopicRequest: CreateTopicRequest = JSON.parse(event!.body!) as CreateTopicRequest;
    const sns = snsInstance();

    sns.createTopic({ Name: createTopicRequest.topicName }).promise().then((data) => {
        console.log("Success", data)
        callback(null, "Success")
    }).catch((error) => {
        console.log("Error", error)
        callback(null, "Error")
    })
}