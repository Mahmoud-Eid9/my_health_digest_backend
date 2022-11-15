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



router.post("/api/sym-checker/autocomplete", async (req: Request, res: Response) => {
  const { symptom } = req.body
  try {
    let result = await SympAutocomp.aggregate([
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: symptom,
            path: "name",
            fuzzy: {
              maxEdits: 2
            },
            tokenOrder: "sequential"
          }
        }
      },
      {
        $project: {
          name: 1
        }
      }, {
        $limit: 10
      }
    ])
    //.toArray();
    res.send(result);
  } catch (e) {
    res.status(500).send({ message: e });
  }
});


export { router as main };
