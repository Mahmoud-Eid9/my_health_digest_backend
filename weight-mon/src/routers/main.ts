import express, { Request, Response } from 'express';
import { Weight } from '../models/weightMon';
import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';
import { StringLiteral } from 'typescript';
const router = express.Router();

router.post(
  '/api/weight-mon/weight',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { userId, cal_goal, cal_progress, water, weight } = req.body;

    const userWeight = await Weight.build({ userId, cal_goal, cal_progress, water, weight });
    userWeight.save();
    console.log(userWeight);

    res.status(200).send(userWeight);
  }
);

router.post(
  '/api/weight-mon/weight/push',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { weight } = req.body;
    const temp = await Weight.findOne({ userId: req.currentUser?.id });
    const userWeight = temp?.weight 
    const x = null
    if(userWeight != undefined)
    if (userWeight.length >= 5) {
      userWeight?.shift()
      userWeight?.push({date: "test", value: weight})
      const x = await Weight.findOne({userId: req.currentUser?.id}, { weight: userWeight})
    }else{
      userWeight?.push({date: "test", value: weight})
     const x =  await Weight.findOne({userId: req.currentUser?.id}, { weight: userWeight})
    }
    console.log(userWeight);
    res.send(x);
  }
);

export { router as main };
