import express, { Request, Response } from 'express';
import { Symptom } from '../models/symptoms';
import { SympAutocomp } from '../models/SymAutocomplete';
const router = express.Router();

router.post('/api/sym-checker/find-disease', async (req: Request, res: Response) => {
  const { symptoms } = req.body;

  const disease = await Symptom.find({ symptoms: { $all: symptoms } });
  console.log(disease);

  res.status(200).send(disease);
});

router.post('/api/sym-checker/symptoms', async (req: Request, res: Response) => {
  const { search } = req.body;
  const results = await SympAutocomp.find()
  res.send(results);
});

export { router as main };
