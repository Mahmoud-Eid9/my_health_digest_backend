import express, { Request, Response } from 'express';
import { Reminder } from '../models/reminder';
const router = express.Router();

router.post('/api/med-reminder/add', async (req: Request, res: Response) => {
  const { name, dosage, duration, frequency, time } = req.body;

  const disease = await Reminder.find({ symptoms: { $all: symptoms } });
  console.log(disease);

  res.status(200).send(disease);
});

export { router as main };