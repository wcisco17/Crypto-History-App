import { lstatSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { PutObjectCommandInput } from '@crypto-aws/client';
import mime from 'mime-types';

const isDir = (dir: string) => lstatSync(dir).isDirectory();

type Directory = 'public' | 'server' | 'out' | 'build' | 'dist' | ''

export function uploadS3Files(fileName: string, dir: Directory, AWS_S3_BUCKET: string, buildStructure: PutObjectCommandInput[]): PutObjectCommandInput[] {
  readdirSync(fileName).map((pb) => {
    const pubDir = path.join(fileName, pb);
    if (isDir(pubDir)) {
      uploadS3Files(path.join(pubDir), 'out', AWS_S3_BUCKET, buildStructure); // recursively get all the files ignoring the directory
    } else {
      const allFiles = readFileSync(pubDir, 'utf8');
      const mainDir = pubDir.match(dir);

      const bucketS3Path = pubDir.substring(mainDir!.index!).replace(
        `${mainDir![0]}/`, ''
      );

      buildStructure.push({
        Bucket: AWS_S3_BUCKET,
        Key: `${bucketS3Path}`,
        Body: allFiles,
        ContentType: mime.lookup(bucketS3Path)
      } as PutObjectCommandInput);
    }
  });

  return buildStructure;
}
