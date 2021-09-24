import { ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/client-ses';

export interface IS3Service {
  s3Client: ServiceInputTypes | ServiceOutputTypes;
  directory: string;
  saveFile(filename: string): Promise<string>;
}
