import express from 'express';
import userRouter from './routes/userRoutes';


import dotenv from 'dotenv';
dotenv.config()
import './database';

class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(userRouter);
  }
}

export default new App().app;
