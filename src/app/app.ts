import express, { Application } from 'express';
import { getPurchaseDateResponse } from '../handlers/handlers';
import { PurchaseDateResponse } from '../types';

export const app: Application = express();

app.get('/', (_request, response) => {
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
