import express, { Application } from 'express';

export const app: Application = express();

app.get('/', (request, response) => {
  response.send('API up and running');
});

app.get('/purchase-date', (request, response) => {
  response.send({
    data: {
      address: '123 Test Street',
      purchaseDate: '2000-01-01',
    }
  });
});
