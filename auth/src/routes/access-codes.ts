import express, { Request, Response } from 'express';
import { scrypt, randomBytes } from 'crypto';
import { requireAuth } from '@myhealthdigest/auth-middleware';
import { Code } from '../models/access-code';
import { User } from '../models/user';
import { BadRequestError } from '@myhealthdigest/auth-middleware';
const moment = require('moment-timezone');

import { currentUser } from '@myhealthdigest/auth-middleware';
import { duration } from 'moment';
const zone = 'Africa/Cairo';
const format = 'DD-MM-YYYY HH:mm';

const router = express.Router();

router.post('/api/users/generate', currentUser, async (req: Request, res: Response) => {
  if (req.currentUser?.admin) {
    const { codes, duration, company } = req.body;
    const generated: string[] = [];
    for (let i = 0; i < codes; i++) {
      try {
        const temp = randomBytes(16).toString('hex');
        const result = await Code.build({
          code: temp,
          userId: null,
          used: false,
          duration: duration,
          company: company,
        });
        await result.save();
        generated.push(temp);
      } catch (error) {
        console.log(error);
      }

      console.log('hello world!');
    }

    res.status(200).send(generated);
  } else {
    res.send({ Error: 'You are not Authorized' });
  }

  //in this case if currentUser is not logged in it will be
  //undefined so the or null to make sure the output is unified
});

router.post('/api/users/activate', currentUser, async (req: Request, res: Response) => {
  const { code } = req.body;
  const id = req.currentUser?.id;
  try {
    const existingCode = await Code.findOne({ code, used: false });
    if (!existingCode) {
      throw new BadRequestError('Invalid Access Code');
    }
    const duration = existingCode.duration.split(" ")
    const expiration = moment().tz(zone).add(parseInt(duration[0]), duration[1]).format(format)
    await User.findOneAndUpdate({ _id: id }, { activated: true, expiration: expiration });
    await Code.findOneAndUpdate({ code, used: false }, { userId: id, used: true});
    res.status(204).send({activated: true});
  } catch (error) {
    res.status(422).send({ error: 'Access code is not correct' });
  }
});

router.get('/api/users/codes', async (req, res) => {
  const codes = await Code.find();
  res.status(200).send(codes);
});

router.delete('/api/users/codes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const code = await Code.findOne({_id: id})
    await User.findOneAndUpdate({_id: code?.userId }, {activated: false})
    await Code.findOneAndDelete({ _id: id });
  } catch (error) {
    res.send('Error');
  }
  res.status(204).send('Deleted Successfully');
});

export { router as accessRouter };
