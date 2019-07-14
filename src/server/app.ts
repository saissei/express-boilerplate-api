import * as express from 'express'
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

import { router as apiRouter } from '../routes/api'

class App {
  public express: express.Application = express()

  constructor() {
    this.middleWareInit()
    this.routerInit()
  }

  /**
   * middleware系初期化
   */
  private middleWareInit() {
    // viewEngineは今回使わないのでスルー
    // view engine setup
    // express.set('views', path.join(__dirname, 'views'))
    // express.set('view engine', 'jade')

    this.express.use(logger('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(cookieParser())
    this.express.use(express.static(path.join(__dirname, 'public')))
  }

  /**
   * router初期化
   */
  private routerInit() {
    this.express.use('/', apiRouter)
  }
}

// appをexport
export default new App().express
