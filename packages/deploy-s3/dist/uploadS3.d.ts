import { PutObjectCommandInput } from '@crypto-aws/client';
declare type Directory = 'public' | 'server' | 'out' | 'build' | 'dist';
export declare function uploadS3Files(fileName: string, dir: Directory, AWS_S3_BUCKET: string): PutObjectCommandInput[];
export {};
//# sourceMappingURL=uploadS3.d.ts.map