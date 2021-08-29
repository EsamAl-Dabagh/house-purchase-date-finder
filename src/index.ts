import express, { Application } from 'express';

const port = process.env.PORT || '8000';

export const app: Application = express();

app.get('/', (request, response) => {
  response.send('API up and running');
});

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});
