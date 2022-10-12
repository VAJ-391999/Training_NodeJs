import { SQSEvent } from 'aws-lambda'
export const getQueueRecords = (event: SQSEvent) => {
    console.log(`Processing data from queue with records ${JSON.stringify(event.Records)}`)
}