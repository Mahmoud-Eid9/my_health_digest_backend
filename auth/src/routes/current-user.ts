import express from 'express';
import { requireAuth } from '@myhealthdigest/auth-middleware';

import { currentUser } from '@myhealthdigest/auth-middleware';
import { isRegularExpressionLiteral } from 'typescript';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
  //in this case if currentUser is not logged in it will be
  //undefined so the or null to make sure the output is unified
});



export { router as currentUserRouter };
