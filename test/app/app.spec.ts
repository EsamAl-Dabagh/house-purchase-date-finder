import request from 'supertest';
import { app } from '../../src/app/app';

describe('GET /', () => {
  it('should return 200', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
  })
});

describe('GET /purchase-date', () => {
  it('should return response containing address and purchase date', async () => {

    const buildingNumber = '2';
    const street = 'Churchside';
    const postcode = 'B79 9HE';

    const result = await request(app).get(`/purchase-date?buildingNumber=${buildingNumber}&street=${street}&postcode=${postcode}`).send();

    const expectedResponse = {
      "address": '2 Churchside, B79 9HE',
      "purchaseDate": '1995-07-21',
    }

    expect(result.status).toBe(200);
    expect(result.type).toEqual('application/json');
    expect(result.body.address).toBe(expectedResponse.address);
    expect(result.body.purchaseDate).toBe(expectedResponse.purchaseDate);
  });
});
