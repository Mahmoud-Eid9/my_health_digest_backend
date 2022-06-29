import express, { Request, Response } from 'express';
import { Reminder } from '../models/reminder';
const router = express.Router();

router.post('/api/med-reminder/add', async (req: Request, res: Response) => {
  const { name, dosage, duration, frequency, time } = req.body;

  const result = await Reminder.build({ name, dosage, duration, frequency, time});
  await result.save();
  res.status(200).send(result);
});

router.get('/api/med-reminder/get', async (req: Request, res: Response) => {
  const reminders = await Reminder.find();
  res.status(200).send(reminders);
});

export { router as main };