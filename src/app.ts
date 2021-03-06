import express from 'express';
import { Server } from 'socket.io'
import cors from "cors";
import dotenv from 'dotenv';
import http from 'http'

dotenv.config()
import './infra/database';

import userRouter from './routes/userRoutes';
import roomRouter from './routes/roomRoutes';
import messageRouter from './routes/messageRoutes';
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
    const io = new Server(httpsServer, {
      cors: {
        origin: '*'
      }
    })
    io.use(verifyUserID)
    handlerEventsWhenConnected(io);
  }
  configs() {
    this.app.use(express.json());
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }
  errorsHandler() {
    this.app.use(errorHandler)

  }
  routes() {
    this.app.use(userRouter);
    this.app.use(roomRouter);
    this.app.use(messageRouter);
  }
}

export default new App();
