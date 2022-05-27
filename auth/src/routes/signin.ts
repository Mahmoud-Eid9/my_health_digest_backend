import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import jwt from 'jsonwebtoken';
import { PasswordManager } from '../services/password-manager';
import { User } from '../models/user';
import { validateRequest } from '@myhealthdigest/auth-middleware';
import { BadRequestError } from '@myhealthdigest/auth-middleware';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        age: existingUser.age,
        gender: existingUser.gender
      },
      process.env.JWT_KEY!
    );

    res.status(200).send({ token: userJwt, existingUser });
  }
);

export { router as signinRouter };
