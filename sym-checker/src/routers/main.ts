import express, { Request, Response } from 'express';
import { Symptom } from '../models/symptoms';
import { SympAutocomp } from '../models/SymAutocomplete';
const router = express.Router();

interface symptomAttrs {
  _id: string;
  name: string;
}
interface disAttrs {
  _id: string;
  disease: string;
  symptoms: Array<string>;
}

router.post('/api/sym-checker/find-disease', async (req: Request, res: Response) => {
  const { symptoms } = req.body;

  Symptom.find({ symptoms: { $all: symptoms } }, (err: Error, doc: Array<disAttrs>) => {
    const disArray: Array<String> = [];
    doc.forEach((dis) => {
      disArray.push(dis.disease);
    });
    res.send(disArray);
  });
});

router.get('/api/sym-checker/symptoms', (req: Request, res: Response) => {
  const results = SympAutocomp.find({}, (err: Error, doc: Array<symptomAttrs>) => {
    const symArray: Array<String> = [];
    doc.forEach((sym) => {
      symArray.push(sym.name);
    });
    res.send(symArray);
  });
});

export { router as main };
