import express from 'express';
import { router } from './routes/main';
import { currentUser, requireAuth } from '@myhealthdigest/auth-middleware';

const app = express();

app.use('/api/pdfs/static', express.static(__dirname + '/public'));
app.use(express.json());

app.use((req, res, next) => {
  res.status(404).send({
  status: 404,
  error: 'Not found'
  })
 })

app.use('/api/pdfs', router);

app.listen(3001, () => {
  console.log('pdfs listening on port 3001....');
});
