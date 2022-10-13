import { APIGatewayEvent, Callback, Context } from 'aws-lambda'
import { snsInstance } from '../common/snsInstance'

export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
    const sns = snsInstance();

    sns.listTopics({}).promise().then((data) => {
        console.log(data)
        callback(null, "Success")
    }).catch((error) => {
        console.log("Error", error);
        callback(null, "Error")
    })

}