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
import { handlerEvents } from './websockets/handler/handlerEvents';




class App {
  app: express.Application;
  constructor() {
    this.app = express();
    this.configs();
    this.routes();
    this.middlewares();
  }

  webSockets(httpsServer: http.Server) {
    const io = new Server(httpsServer)
    io.use(verifyUserID)
    io.on("connect", handlerEvents)

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

export default new App();
