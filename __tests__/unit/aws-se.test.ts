import { S3Storage } from '../../src/aws/services/S3/uploadImage';
import { S3Client } from '@aws-sdk/client-s3';
import fs from 'fs'

describe("#Test S3-Services", () => {
  const s3ClientMock = { send: jest.fn() } as any as S3Client;
  const urlMock = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/CreateAcount.html`;
  test("Should return a URL", async () => {
    jest.spyOn(s3ClientMock, 'send')
      .mockImplementation(jest.fn())
    jest.spyOn(fs, 'unlink')
      .mockImplementation(jest.fn())
    const s3Storage = new S3Storage(s3ClientMock, 'src/templates')
    const result = await s3Storage.saveFile('CreateAcount.html')
    expect(result).toBe(urlMock)
  })
})
