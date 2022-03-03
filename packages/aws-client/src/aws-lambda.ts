import { Lambda } from '@aws-sdk/client-lambda';
import AWS from 'aws-sdk'

export async function loadLambdaClient(): Promise<Lambda | undefined> {
  const AWS_REGION = process.env.AWS_REGION as string;
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
  try {
    return new Lambda({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });
  } catch (err) {
    console.warn(`
        [Error loadLambdaClient] - Error loading LambdaClient client. 
    `);
  }
}

