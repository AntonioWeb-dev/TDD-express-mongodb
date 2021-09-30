import { PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import mime from 'mime';
import fs from 'fs';
import { IS3Service } from '../../../interfaces/s3.interface';


export async function UploadImage(s3Client: IS3Service, directory: string, filename: string) {

  const originalPath = path.resolve(directory, filename);
  const ContentType = mime.getType(originalPath);
  const bucket = process.env.AWS_BUCKET;

  if (!ContentType) {
    throw new Error('File not found!');
  }
  const fileContent = await fs.promises.readFile(originalPath);
  try {
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }));
    fs.unlink(originalPath, (err) => {
      if (err) {
        throw Error("Failed to delete the file")
      }
    });
    return `https://${bucket}.s3.amazonaws.com/${filename}`
  } catch (err) {
    return undefined;
  }
}
