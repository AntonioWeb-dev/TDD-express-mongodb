import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../service/UserSerivice';
import { S3Storage } from '../aws/services/S3/uploadImage';
import MulterConfig from '../utils/Multer';
import multer from 'multer';
import { s3Client } from '../aws/clients/S3-client';

const fileMiddleware = multer(MulterConfig)

const routes = Router();
const s3Storage = new S3Storage(s3Client, MulterConfig.directory)
const userService = new UserService()
const userController = new UserController(userService, s3Storage);

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', fileMiddleware.single('avatar'), userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.update);



export default routes;
