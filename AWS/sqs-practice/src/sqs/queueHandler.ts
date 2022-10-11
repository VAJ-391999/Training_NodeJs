import { SQSEvent } from 'aws-lambda'
export const queueHandler = (event: SQSEvent) => {
    console.log(`Processing data from queue with records ${JSON.stringify(event.Records)}`)
}