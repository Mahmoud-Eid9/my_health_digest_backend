import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '@myhealthdigest/auth-middleware';
import { validateRequest } from '@myhealthdigest/auth-middleware';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('gender').isLength({ min: 3, max: 7 }).withMessage('Must provide Valid gender'),
    body('age').isInt().withMessage('Age must be a valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name, age, gender, company } = req.body;

    const existingUser = await User.findOne({ email });

    try {
      if (existingUser) {
        throw new BadRequestError('Email already exists');
      }
      const user = User.build({
        email,
        password,
        name,
        age,
        gender,
        admin: false,
        activated: false,
        expiration: null,
        company,
      });
      await user.save();

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          gender: user.gender,
          admin: user.admin,
          activated: user.activated,
          expiration: user.expiration,
          company: user.company,
        },
        process.env.JWT_KEY!
      );

      res.status(201).send({ token: userJwt, user });
    } catch (error) {
      res.status(400).send({ message: 'User Already Exists' });
    }
  }
);

export { router as signupRouter };
