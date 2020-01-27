import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

export { router };
