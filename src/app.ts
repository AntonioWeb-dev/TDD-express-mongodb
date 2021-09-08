import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import './database';

import userRouter from './routes/userRoutes';
import roomRouter from './routes/roomRoutes';



class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.configs();
    this.routes();
  }
  configs() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(userRouter);
    this.app.use(roomRouter);
  }
}

export default new App().app;
