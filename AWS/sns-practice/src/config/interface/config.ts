export interface Config {
  sns: SNSConfig;
  region: string;
  sqs: SQSConfig;
}

export interface SNSConfig {
  endPoint: string;
}
export interface SQSConfig {
  endPoint: string;
  maxNumberOfMessages: number;
  accessKeyId: string;
  secretAccessKey: string;
  visibilityTimeout: number;
}
