import express, { Request, Response } from 'express';
import { Medicine } from '../models/medicine';
const router = express.Router();

router.post('/api/barcode/check', async (req: Request, res: Response) => {
  const {barcode} = req.body
  const result = await Medicine.find({barcode})
  res.status(200).send(result);
});



export { router as main };
