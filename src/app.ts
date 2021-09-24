import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import './database';

import userRouter from './routes/userRoutes';
import roomRouter from './routes/roomRoutes';
import { errorHandler } from './middleware/errorHandle';



class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.configs();
    this.routes();
    this.middlewares();
  }
  configs() {
    this.app.use(express.json());
  }
  middlewares() {
    this.app.use(errorHandler)
  }

  routes() {
    this.app.use(userRouter);
    this.app.use(roomRouter);
  }
}

export default new App().app;
