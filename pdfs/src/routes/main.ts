import express, { Request, Response } from 'express';
const router = express.Router();
import {arrangePdfs} from '../controllers/main';


router.get('/get-pdfs/:language/:category', async (req: Request, res: Response) => {
  await arrangePdfs(req.params.category, req.params.language)
    .then((pdfs) => {
      console.log("Served Pdfs");
      res.status(200).send(pdfs);
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

export { router as router };
