import { lstatSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { PutObjectCommandInput } from '@crypto-aws/client';
import mime from 'mime-types';

const isDir = (dir: string) => lstatSync(dir).isDirectory();

type Directory = 'public' | 'server' | 'out' | 'build' | 'dist'

export function uploadS3Files(fileName: string, dir: Directory, AWS_S3_BUCKET: string) {
  const buildStructure: PutObjectCommandInput[] = [];
  readdirSync(fileName).map((pb, j) => {
    const pubDir = path.join(fileName, pb);
    if (isDir(pubDir)) {
      uploadS3Files(path.join(pubDir), dir, AWS_S3_BUCKET); // recursively get all the files ignoring the directory
    } else {
      try {
        const allFiles = readFileSync(pubDir, 'utf8');
        const mainDir = pubDir.match(dir);
        // @ts-ignore
        const bucketS3Path = pubDir.substring(mainDir.index).replace(`${mainDir[0]}/`, '');

        buildStructure.push({
          Bucket: AWS_S3_BUCKET,
          Key: `${bucketS3Path}`,
          Body: allFiles,
          ContentType: mime.lookup(bucketS3Path)
        } as PutObjectCommandInput);
      } catch (e) {
        console.error(`Error reading file, process terminated (Reason): ${e}`);
        throw e;
      }
    }
  });
  return buildStructure;
}