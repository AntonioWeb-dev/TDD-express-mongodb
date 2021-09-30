import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { ServiceOutputTypes } from '@aws-sdk/client-ses';

type S3Command =
  PutObjectCommand |
  DeleteObjectCommand


export interface IS3Service {
  send(putObject: S3Command): Promise<ServiceOutputTypes>;
}
