import express, { Request, Response } from 'express';
import { Symptom } from '../models/symptoms';
import { SympAutocomp } from '../models/SymAutocomplete';
const router = express.Router();

interface symptomAttrs  {
  _id: string;
  name: string;
}

router.post('/api/sym-checker/find-disease', async (req: Request, res: Response) => {
  const { symptoms } = req.body;

  const disease = await Symptom.find({ symptoms: { $all: symptoms } });
  console.log(disease);

  res.status(200).send(disease);
});

router.get('/api/sym-checker/symptoms', (req: Request, res: Response) => {
  const { search } = req.body;
  const results =  SympAutocomp.find({},(err: Error, doc: Array<symptomAttrs>) => {
    const symArray: Array<String> = [];
    doc.forEach((sym) => {
      symArray.push(sym.name)
    })
    res.send(symArray);
  })
});

export { router as main };
