import express from 'express';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { requireAuth } from '@myhealthdigest/auth-middleware';
import { Code } from '../models/acces-code';
import {User} from '../models/user'
import { BadRequestError } from '@myhealthdigest/auth-middleware';

import { currentUser } from '@myhealthdigest/auth-middleware';

const router = express.Router();

router.post('/api/users/generate', currentUser, async (req, res) => {

  if (req.currentUser?.admin) {
   
    const { codes } = req.body;
    const generated: string[] = [];
    for (let i = 0; i < codes; i++) {
      const temp = randomBytes(16).toString('hex');
      const result = await Code.build({ code: temp, userId: null, used: false });
      try {
        await result.save();
      } catch (error) {
        console.log(error);
      }
 
      console.log("hello world!");
      generated.push(temp);
    }

    res.status(200).send(generated);
  } else {
    res.send({ Error: 'You are not Authorized' });
  }

  //in this case if currentUser is not logged in it will be
  //undefined so the or null to make sure the output is unified
});


router.post('/api/users/activate', currentUser ,async (req, res) => {
  const {code} = req.body
  const id = req.currentUser?.id
  try {
   const existingCode = await Code.findOne({code, used: false})
   if(!existingCode){
    throw new BadRequestError('Invalid Access Code');
   }
   const existingUser = await User.findOneAndUpdate({ _id: id }, {activated: true})
   await Code.findOneAndUpdate({code, used: false}, {userId: id, used: true})
   res.status(204).send("User Activated")
  } catch (error) {
    res.status(422).send({error: "Access code is not correct" })
  }
})

router.get('/api/users/codes', async (req, res) => {
  const codes = await Code.find()
  res.status(200).send(codes)
})

router.delete('/api/users/codes/:id', async (req,res) => {
  const id = req.params.id;
  try {
    await Code.findOneAndDelete({_id: id})
  } catch (error) {
    res.send("Error")
  }
  res.status(204).send("Deleted Successfully")


})

export { router as accessRouter };
