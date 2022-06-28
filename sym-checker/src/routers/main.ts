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

router.post('/api/sym-checker/autocomplete', async (req: Request, res: Response) => {
  const { search } = req.body;
  const results = await SympAutocomp.aggregate([
    {
      $search: {
        index: 'autocomplete',
        autocomplete: {
          query: search,
          path: 'name',
          fuzzy: {
            maxEdits: 1,
          },
          tokenOrder: 'sequential',
        },
      },
    },
    {
      $project: {
        name: 1,
        _id: 1,
        score: { $meta: 'searchScore' },
      },
    },
    {
      $limit: 5,
    },
  ]);
  res.send(results);
});

export { router as main };
