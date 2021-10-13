import { Router } from 'express';
import multer from 'multer';

import MulterConfig from '../utils/Multer';
import { UserController } from '../controllers/UserController';
import { s3Client } from '../aws/clients/S3-client';
import { UserService } from '../service/UserSerivice';
import { authorization } from '../middleware/authorization';

const fileMiddleware = multer(MulterConfig)

const routes = Router();
const userService = new UserService()
const userController = new UserController(userService, s3Client);

routes.get('/users', authorization, userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', fileMiddleware.single('avatar'), userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.update);



export default routes;
