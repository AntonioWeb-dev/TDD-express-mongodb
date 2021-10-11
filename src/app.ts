import express from 'express';
import { Server } from 'socket.io'
import dotenv from 'dotenv';
import http from 'http'
dotenv.config()
import './database';

import userRouter from './routes/userRoutes';
import roomRouter from './routes/roomRoutes';
import { errorHandler } from './middleware/errorHandle';
import { verifyUserID } from './websockets/middlewares/verifyUserID';
import { handlerEventsWhenConnected } from './websockets/handler/handlerEventsWhenConnected';


class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.configs();
    this.middlewares();
    this.routes();
    this.errorsHandler();
  }

  webSockets(httpsServer: http.Server) {
    const io = new Server(httpsServer)
    io.use(verifyUserID)
    io.on("connect", handlerEventsWhenConnected)

  }
  configs() {
    this.app.use(express.json());
  }
  middlewares() {
    this.app.use(express.json())
  }
  errorsHandler() {
    this.app.use(errorHandler)

  }

  routes() {
    this.app.use(userRouter);
    this.app.use(roomRouter);
  }
}

export default new App();
