import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadS3Client, S3 } from '@crypto-aws/client';
import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local'
});

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface SyntheticResult {
  start: string;
  target: number[];
}

(async () => {
  let file = __dirname.replace('dist', 'src');
  const testFileName = path.join(file, 'data/test_data.json');
  const testFileExist = fs.existsSync(testFileName);

  async function getSyntheticData(): Promise<SyntheticResult | undefined> {
    let result: SyntheticResult | undefined;

    if (!testFileExist)
      try {
        console.log('reading from [api]...');
        const getSyntheticData = await fetch(process.env.SYTHETIC_API as string, {
          method: 'get'
        });

        if (getSyntheticData.ok) {
          let data: unknown = await getSyntheticData.json();
          // write to file
          fs.writeFileSync(testFileName, JSON.stringify((data as SyntheticResult)));

          result = (data as SyntheticResult);
        }

      } catch (e) {
        result = undefined;
        throw new Error(`[getSyntheticData] Reason: ${e}`);
      }

    else {
      console.log('reading safely from file...');
      const content = fs.readFileSync(testFileName);
      result = JSON.parse(content.toString('utf-8')) as SyntheticResult;
    }

    return result;
  }

  function pushToS3(client: S3 | undefined, testData: SyntheticResult, trainingData: SyntheticResult) {
    if (client) {
      let params: S3.Types.PutObjectRequest[] = [];

      params.push(
        {
          Bucket: process.env.AWS_S3_BUCKET_SYTHETIC_DATA as string,
          Key: 'test_data.json',
          Body: JSON.stringify(testData)
        },
        {
          Bucket: process.env.AWS_S3_BUCKET_SYTHETIC_DATA as string,
          Key: 'training_data.json',
          Body: JSON.stringify(trainingData)
        });

      params.map((param) => {
        client.putObject(param, (err, data) => {
          if (err) throw new Error(`[pushToS3] Reason: ${err}`);
          if (data) console.info(`Successfully added ${param.Key}`);
        });
      });
    }

  }

  const testData = await getSyntheticData();
  if (testData) {
    // get 30% of the data.
    const trainingLength = (testData.target.length as number) * 0.30;

    let trainingSetData: SyntheticResult = {
      start: testData.start,
      target: new Array(trainingLength)
    };

    for (let i = trainingLength; i < testData.target.length; i++)
      trainingSetData.target[i] = (testData.target[i]);

    // filter out some null values
    trainingSetData.target = trainingSetData.target.filter(item => item != null);

    // if file exist send to S3 and the training data has the correct itemLength
    const isReady = testFileExist && trainingSetData.target.length >= trainingLength;
    if (isReady) pushToS3(await loadS3Client(), testData, trainingSetData);
  }

})();