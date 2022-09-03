import express, { Request, Response } from 'express';
import { Weight } from '../models/weightMon';
import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';
const router = express.Router();

router.post('/api/weight-mon/weight',currentUser, requireAuth, async (req: Request, res: Response) => {
  const { userId, cal_goal, cal_progress, water, weight } = req.body;

  const disease = await Weight.build({ userId, cal_goal, cal_progress, water, weight });
  console.log(disease);

  res.status(200).send(disease);
});


export { router as main };
