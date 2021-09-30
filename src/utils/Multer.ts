import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { IMulterConfig } from '../interfaces/multer.interface';

// File will be storage in folder "tmp" temporarily
const tmpFolder = path.resolve(__dirname, '..', '/tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const fileUUID = uuid();
      const filename = `${fileUUID}-${file.originalname}`;
      return callback(null, filename);
    }
  }),
} as IMulterConfig;
