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
    response.status(400);
    response.send('Bad request: Invalid query string parameters');
    throw new Error('Invalid query string parameters');
  }

  response.setHeader('content-type', 'application/json');
  response.send(purchaseDateResponse);
});
