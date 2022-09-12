import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import jwt from 'jsonwebtoken';
import { PasswordManager } from '../services/password-manager';
import { User } from '../models/user';
import { Code } from '../models/access-code';
import { validateRequest } from '@myhealthdigest/auth-middleware';
import { BadRequestError } from '@myhealthdigest/auth-middleware';
import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';
const moment = require('moment');
const zone = 'Africa/Cairo';
const format = 'DD-MM-YYYY HH:mm';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().trim().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    try {
      
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    console.log(existingUser.password);
    console.log(password);
    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);
    console.log('hello wrold');
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    let userJwt = null;

    // Generate JWT
    if (existingUser.admin) {
      userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          admin: true,
        },
        process.env.JWT_KEY!
      );
    } else {
      userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          age: existingUser.age,
          gender: existingUser.gender,
          admin: existingUser.admin,
          activated: existingUser.activated,
          expiration: existingUser.expiration,
          company: existingUser.company,
        },
        process.env.JWT_KEY!
      );
    }

    res.status(200).send({ token: userJwt, existingUser });
    } catch (error) {
      res.send({message: "Invalid credentials"})
    }

  }
);

router.get('/api/users/verify', currentUser, requireAuth, async (req, res) => {
  const user = await User.findById(req.currentUser?.id);
  try {
    if (!user) {
      throw new BadRequestError('No Such User');
    }
    if (user.activated) {
      if (moment.tz(user.expiration, format, zone).isBefore(moment().tz(zone))) {
        await User.findOneAndUpdate({ _id: user.id }, { activated: false, expiration: null });
        await Code.findOneAndDelete({ userId: user.id });
        res.status(200).send({ activated: false });
      } else {
        res.status(200).send({ activated: true });
      }
    } else {
      res.status(200).send({ activated: false });
    }
  } catch (error) {
    res.send({message: "No Such User"})
  }


});

export { router as signinRouter };
