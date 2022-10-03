import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';
import express, { Request, Response } from 'express';
import { Reminder } from '../models/reminder';
const moment = require('moment-timezone');
const router = express.Router();
const zone = 'Africa/Cairo';
const format = 'DD-MM-YYYY HH:mm';

interface MedAttrs {
  name: string;
  dosage: number;
  duration: {
    value: number;
    unit: string;
  };
  frequency: Array<string>;
  time: Array<string>;
  userid: string;
  expiration: string;
  remove(): string;
}

router.post('/api/med-reminder/add', async (req: Request, res: Response) => {
  const { name, dosage, duration, frequency, time } = req.body;
  const userid = String(req.currentUser?.id);
  const expiration = moment().tz(zone).add(parseInt(duration.value), duration.unit).format(format);
  const result = await Reminder.build({
    name,
    dosage,
    duration,
    frequency,
    time,
    userid,
    expiration,
  });
  await result.save();
  res.status(200).send(result);
});

router.get('/api/med-reminder/get', async (req: Request, res: Response) => {
  const userid = String(req.currentUser?.id);
  const reminders = await Reminder.find({ userid });
    reminders.forEach(async (rem) => {
      if (rem.duration.unit != 'Lifetime') {
        if (moment.tz(rem.expiration, format, zone).isBefore(moment().tz(zone))) {
          await Reminder.findOneAndDelete({ _id: rem._id });
        }
      }
    });
  res.status(200).send(reminders);
});

router.delete('/api/med-reminder/delete/:medId', async (req: Request, res: Response) => {
  const medId = req.params.medId;
  const reminder = await Reminder.deleteOne({ _id: medId });
  res.status(200).send({message: "Reminder Deleted"});
});

export { router as main };
