import express, { Request, Response } from 'express';
const router = express.Router();
import { arrangePdfs, arrangeSubPdfs } from '../controllers/main';

router.get('/get-pdfs/:language/:category', async (req: Request, res: Response) => {
  await arrangePdfs(req.params.category, req.params.language)
    .then((pdfs) => {
      console.log('Served Pdfs');
      res.status(200).send(pdfs);
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

router.get('/get-pdfs/:language/:category/:subcategory', async (req: Request, res: Response) => {
  await arrangeSubPdfs(req.params.category, req.params.language, req.params.subcategory)
    .then((pdfs) => {
      console.log('Served Pdfs');
      res.status(200).send(pdfs);
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

export { router as router };
