import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { IS3Service } from '../../../../interfaces/s3.interface';


export async function UploadBuffer(s3Client: IS3Service, buffer: Buffer) {
  const bucket = process.env.AWS_BUCKET;
  const filename = `${uuid()}-AUDIO.webm`;
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: `audios/${filename}`,
      ACL: 'public-read',
      Body: buffer,
      ContentType: '.webm'
    }))
    return `https://${bucket}.s3.amazonaws.com/audios/${filename}`
  } catch (err) {
    throw err;
  }
}
