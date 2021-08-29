import express, { Application } from 'express';
import { getPurchaseDateResponse, PurchaseDateResponse } from '../handlers/handlers';

export const app: Application = express();

app.get('/', (request, response) => {
  response.send('API up and running');
});

app.get('/purchase-date', (request, response) => {
  let purchaseDateResponse: PurchaseDateResponse;


  try {
    purchaseDateResponse = getPurchaseDateResponse(request);
  } catch (err) {
    throw new Error('Unable to retrieve data');
  }

  response.setHeader('content-type', 'application/json');
  response.send(purchaseDateResponse);
});
