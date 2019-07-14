import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
const router: express.Router = express.Router()

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('success')
})

export { router }
