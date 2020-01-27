import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from '../logger/LoggerBase';
import helmet from 'helmet';

import { router as apiRouter } from '../routes/api';

class App {
  public express: Application = express();

  constructor() {
    this.middleWareInit();
    this.routerInit();
  }

  private middleWareInit(): void {
    // viewEngineは今回使わないのでスルー
    // view engine setup
    // express.set('views', path.join(__dirname, 'views'))
    // express.set('view engine', 'jade')

    this.express.use(logger.connectLogger('INFO'));
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(express.static(path.join(__dirname, 'public')));
  }

  private routerInit(): void {
    this.express.use('/', apiRouter);
  }
}

export default new App().express;
