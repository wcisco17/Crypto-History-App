import { DynamoDB } from '@aws-sdk/client-dynamodb';

export async function loadDynamoDBClient(): Promise<DynamoDB | undefined> {
  const AWS_REGION = process.env.AWS_REGION as string;
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

  try {
    return new DynamoDB({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });
  } catch (err) {
    console.warn(`
        [Error loadDynamoDBClient] - Error loading DynamoDB client. 
    `);
  }
}