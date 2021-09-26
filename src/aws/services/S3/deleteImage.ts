import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { IS3Service } from '../../../interfaces/s3.interface';

export async function deleteImage(s3Client: IS3Service, filename: string) {
  const nameFileInBucket = filename.split('/')[3]
  const bucketParams = {
    Bucket: process.env.AWS_BUCKET,
    Key: nameFileInBucket
  }
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    console.log(data)
    return data;
  } catch (err) {
    throw err
  }
}
