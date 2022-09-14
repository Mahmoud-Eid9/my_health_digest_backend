import express, { Request, Response } from 'express';
import { Weight } from '../models/weightMon';
import { currentUser, BadRequestError, requireAuth } from '@myhealthdigest/auth-middleware';
import { StringLiteral } from 'typescript';
const router = express.Router();
import { Calories } from '../models/Calories';

router.post(
  '/api/weight-mon/calories',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { search } = req.body;
    const result = await Calories.aggregate([
      {
        $search: {
          index: 'autocomplete',
          autocomplete: {
            query: `${search}`,
            path: 'item',
            // fuzzy: {
            //   maxEdits: 2,
            // },
          },
        },
      },
    ]);
    res.send({ result });
  }
);

export { router as calories };
