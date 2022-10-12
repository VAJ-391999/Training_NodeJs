export interface SendMessageRequest {
    queueName: string,
    queueUrl: string,
    messageBody: any
}