import { Router } from 'express';
import multer from 'multer';
import { UserController } from '../controllers/UserController';
import { AuthenticationController } from '../controllers/AuthenticationController';

import MulterConfig from '../utils/Multer';
import { s3Client } from '../infra/aws/clients/S3-client';
import { authorization } from '../middleware/authorization';

import { userService } from './injection';
const fileMiddleware = multer(MulterConfig)

const routes = Router();
const userController = new UserController(userService, s3Client);
const authenticationControler = new AuthenticationController(userService);

routes.get('/users', authorization, userController.index);
routes.get('/users/:id', authorization, userController.show);
routes.post('/users', fileMiddleware.single('avatar'), userController.create);
routes.delete('/users/:id', authorization, userController.delete);
routes.put('/users/updateavatar', authorization, fileMiddleware.single('avatar'), userController.updateImage);
routes.put('/users/:id', authorization, userController.update);

routes.post('/login', authenticationControler.login)

export default routes;
