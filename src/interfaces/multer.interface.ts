import { StorageEngine } from 'multer';

export interface IMulterConfig {
  directory: string;
  storage: StorageEngine;
}
