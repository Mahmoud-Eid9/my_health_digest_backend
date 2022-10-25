import express, { Request, Response } from 'express';
import { Weight } from '../models/weightMon';
import { currentUser, BadRequestError, requireAuth } from '@myhealthdigest/auth-middleware';
import { StringLiteral } from 'typescript';
const router = express.Router();
const moment = require('moment-timezone');

const format = 'DD-MM-YYYY';
const zone = 'Africa/Cairo';

router.post(
  '/api/weight-mon/weight',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { cal_goal, cal_progress, water, exercise, weight } = req.body;
    const userId = req.currentUser?.id;
    try {
      if (!userId) {
        throw new BadRequestError('No Such User');
      }
      const temp = await Weight.findOne({ userId: userId });
      if (!temp) {
        const userWeight = await Weight.build({
          userId,
          cal_goal,
          cal_progress,
          water,
          exercise,
          weight,
          date: moment().tz(zone).format(format)
        });
        userWeight.save();
        console.log(userWeight);
        res.status(200).send(userWeight);
      } else {
        res.send({ error: 'User Already Has Weight Data' });
      }
    } catch (error) {
      res.send({ message: "No Such User" })
    }

  }
);

router.post(
  '/api/weight-mon/weight/water',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.currentUser) {
        throw new BadRequestError('No Such User');
      }
      const { water } = req.body;
      const id = req.currentUser.id;
      await Weight.findOneAndUpdate({ userId: id }, { water: water });
      res.status(200).send({ message: 'Water Updated' });
    } catch (error) {
      res.send({ message: "No Such User" })
    }
  }
);

router.post(
  '/api/weight-mon/weight/cal-progress',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.currentUser) {
        throw new BadRequestError('No Such User');
      }
      const { calProgress } = req.body;
      const id = req.currentUser.id;
      await Weight.findOneAndUpdate({ userId: id }, { cal_progress: calProgress });
      res.status(200).send({ message: 'Calories Progress Updated' });
    } catch (error) {
      res.send({ message: "No Such User" })
    }
  }
);

router.post(
  '/api/weight-mon/weight/cal-goal',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.currentUser) {
        throw new BadRequestError('No Such User');
      }
      const { calGoal } = req.body;
      const id = req.currentUser.id;
      await Weight.findOneAndUpdate({ userId: id }, { cal_goal: calGoal });
      res.status(200).send({ message: 'Calories Goal Updated' });
    } catch (error) {
      res.send({ message: "No Such User" })
    }
  }
);

router.post(
  '/api/weight-mon/weight/exercise',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.currentUser) {
        throw new BadRequestError('No Such User');
      }
      const { exercise } = req.body;
      const id = req.currentUser.id;
      await Weight.findOneAndUpdate({ userId: id }, { exercise: exercise });
      res.status(200).send({ message: 'Exercise Updated Updated' });
    } catch (error) {
      res.send({ message: "No Such User" })
    }

  }
);

router.get(
  '/api/weight-mon/weight',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!req.currentUser) {
        throw new BadRequestError('No Such User');
      }
      const id = req.currentUser.id;
      const weight = await Weight.findOne({ userId: id });
      if (!weight) {
        const newWeight = await Weight.build({
          userId: id,
          cal_goal: 0,
          cal_progress: 0,
          water: 0.0,
          exercise: 0,
          weight: [],
          date: moment().tz(zone).format(format)
        });
        newWeight.save()
        res.status(200).send(newWeight)
      } else {
        if (moment(weight.date, format).isBefore(moment(format))) {
          const nWeight = await Weight.findOneAndUpdate({ _id: weight._id }, { cal_progress: 0, water: 0.0, exercise: 0 })
          nWeight?.save()
          res.status(200).send(nWeight)
        }
        res.status(200).send(weight);
      }
    } catch (error) {
      res.send({ message: "No Such User" })
    }

  }
);

router.post(
  '/api/weight-mon/weight/push',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { weight } = req.body;
    const temp = await Weight.findOne({ userId: req.currentUser?.id });
    try {
      if (!temp) {
        throw new BadRequestError('No Weight Data for User');
      }
      const userWeight = temp.weight;
      const x = null;
      if (!userWeight) {
        throw new BadRequestError('No Weight Data for User');
      }
      if (userWeight.length >= 5) {
        userWeight.shift();
        userWeight.push({ date: moment().format(format), value: weight });
        const x = await Weight.findOneAndUpdate(
          { userId: req.currentUser?.id },
          { weight: userWeight }
        );
      } else {
        userWeight.push({ date: moment().format(format), value: weight });
        const x = await Weight.findOneAndUpdate(
          { userId: req.currentUser?.id },
          { weight: userWeight }
        );
      }
      console.log(userWeight);
      res.send(userWeight);
    } catch (error) {
      res.send({ message: "No Weight Data for User" })
    }

  }
);

export { router as main };
