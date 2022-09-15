import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';
import express, { Request, Response } from 'express';
import { Appoint } from '../models/reminder';
const router = express.Router();

router.post('/api/doc-app/add', async (req: Request, res: Response) => {
  const { name, date } = req.body;
  const userid = String(req.currentUser?.id);

  const result = await Appoint.build({ name, date, userid });
  await result.save();
  res.status(200).send(result);
});

router.get('/api/doc-app/get', async (req: Request, res: Response) => {
  const userid = String(req.currentUser?.id);
  const reminders = await Appoint.find({ userid });
  res.status(200).send(reminders);
});

router.post('/api/doc-app/delete', async (req: Request, res: Response) => {
  const { id } = req.body;
  const reminder = await Appoint.deleteOne({ _id: id });
  res.status(200).send({ message: 'Done' });
});

export { router as main };
