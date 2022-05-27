import express, { Request, Response } from 'express';
const router = express.Router();
import {arrangePdfs} from '../controllers/main';


router.get('/get-pdfs/:category', async (req: Request, res: Response) => {
  await arrangePdfs(req.params.category)
    .then((pdfs) => {
      res.status(200).send(pdfs);
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

export { router as router };
