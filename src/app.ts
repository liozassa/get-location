import express from 'express';
import mongoose from 'mongoose';
import { Application } from "express";
import Logger from './utils/logger';
import { env } from 'process';

export class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.setMongoConfig();
    }

    private setMongoConfig() {
      mongoose.Promise = global.Promise;
      mongoose.connect(`mongodb+srv://lioz:${env.MONGO_ATLAS_PW}@castor-service.pua5u.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(() => {
        Logger.debug('db connection succesful', env.DB_NAME);
      })
      .catch((err) => console.error(err));
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
      middleWares.forEach(middleWare => {
          this.app.use(middleWare);
      });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
      controllers.forEach(controller => {
        this.app.use(`/api/${controller.path}`, controller.router);
      });
    }
  
    public listen() {
      this.app.listen(this.port, '0.0.0.0', () => {
        Logger.debug(`App listening on the http://localhost:${this.port}`);
      });
    }
}