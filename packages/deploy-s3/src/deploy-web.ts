import dotenv from 'dotenv';
import { uploadS3Files } from './uploadS3.js';
import { loadS3Client, PutObjectCommandInput, S3 } from '@crypto-aws/client';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config({
  path: '.env.local'
});

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function deletePreviousContent(client: S3, previousContent: S3.Types.DeleteObjectsRequest) {
  return await client.deleteObjects(previousContent, (err, res) => {
    if (err)
      console.warn(`Error [deletePreviousContent] cause: ${err.message}`);
    console.log(`Successfully deleted item`);
  }).promise();
}

async function getPreviousWebsiteVersion(client: S3) {
  return await client.listObjects({
    Bucket: process.env.AWS_S3_BUCKET as string
  }, async (err, res) => {
    if (err)
      console.warn(`Error [getWebsite] ${err?.message}`);

    const contents = typeof res.Contents === 'undefined' ? [] : res.Contents;

    await deletePreviousContent(client, {
      Bucket: process.env.AWS_S3_BUCKET as string,
      Delete: {
        Objects: contents.map(({ Key }) => ({
          Key
        }))
      }
    } as S3.Types.DeleteObjectsRequest);

  }).promise();
}

async function uploadWebsiteToS3(client: S3) {
  const publicFile = path.join(__dirname, '../../../apps/web/out');
  const buildStructure: PutObjectCommandInput[] = [];
  uploadS3Files(publicFile, 'out', process.env.AWS_S3_BUCKET as string, buildStructure);

  try {
    for (const files of buildStructure) {
      const upload = await client?.upload({
        Bucket: (files.Bucket as string),
        Body: files.Body,
        Key: (files.Key as string),
        ContentType: files.ContentType
      }).promise();
      if (upload)
        console.log(`Successfully uploaded item`);
    }
  } catch (e) {
    console.warn(`Error [uploadWebsiteToS3] ${e}`);
  }
}

async function deployWebsite() {
  // client
  const s3Client = await loadS3Client();

  // functions
  const deletePreviousContent = await getPreviousWebsiteVersion((s3Client as S3));
  const uploadS3 = await uploadWebsiteToS3((s3Client as S3));

  return Promise.all([
    s3Client,
    deletePreviousContent,
    uploadS3
  ]);
}

deployWebsite();




