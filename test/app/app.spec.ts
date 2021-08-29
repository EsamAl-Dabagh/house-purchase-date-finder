import request from 'supertest';
import { app } from '../../src/app/app';
import { getPurchaseDateResponse } from '../../src/handlers/handlers';

jest.mock('../../src/handlers/handlers.ts', () => ({
  getPurchaseDateResponse: jest.fn(() => ({
    address: '123 Test Street',
    purchaseDate: '2020-05-12',
  })),
}));

describe('GET /', () => {
  it('should return 200', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
  })
});

describe('GET /purchase-date', () => {
  it('should return response containing address and purchase date', async () => {

    const result = await request(app).get('/purchase-date?address=123-test-street').send();

    const expectedResponse = {
      "address": '123 Test Street',
      "purchaseDate": '2020-05-12',
    }

    expect(result.status).toBe(200);
    expect(result.type).toEqual('application/json');
    expect(result.body.address).toBe(expectedResponse.address);
    expect(result.body.purchaseDate).toBe(expectedResponse.purchaseDate);
  });

  it('should call getPurchaseDateResponse', async () => {
    await request(app).get('/purchase-date?address=123-test-street').send();

    expect(getPurchaseDateResponse).toBeCalled();
  });
});
