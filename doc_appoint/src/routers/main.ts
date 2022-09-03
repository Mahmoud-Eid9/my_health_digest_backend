import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';
import express, { Request, Response } from 'express';
import { Reminder } from '../models/reminder';
const router = express.Router();

router.post('/api/med-reminder/add', async (req: Request, res: Response) => {
  const { name, dosage, duration, frequency, time } = req.body;
  const userid = String(req.currentUser?.id);

  const result = await Reminder.build({ name, dosage, duration, frequency, time, userid });
  await result.save();
  res.status(200).send(result);
});

router.get('/api/med-reminder/get', async (req: Request, res: Response) => {
  const userid = String(req.currentUser?.id);
  const reminders = await Reminder.find({ userid });
  res.status(200).send(reminders);
});

router.delete('/api/med-reminder/delete/:medId', async (req: Request, res: Response) => {
  const medId = req.params.medId;
  const reminder = await Reminder.deleteOne({ _id: medId });
  res.status(204).send(reminder);
});

export { router as main };
