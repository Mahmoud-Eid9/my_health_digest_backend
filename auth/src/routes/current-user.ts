import express from 'express';
import { BadRequestError, requireAuth } from '@myhealthdigest/auth-middleware';

import { currentUser } from '@myhealthdigest/auth-middleware';
import { isRegularExpressionLiteral } from 'typescript';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  try {
    if(!currentUser){
      throw new BadRequestError("No Such User")
    }
    res.send({ ...req.currentUser || null }); 
  } catch (error) {
    res.send("No Such User")
  }
  //in this case if currentUser is not logged in it will be
  //undefined so the or null to make sure the output is unified
});



export { router as currentUserRouter };
