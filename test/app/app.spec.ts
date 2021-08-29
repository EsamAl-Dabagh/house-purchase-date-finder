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
    const expectedResponse = {
      "data": {
        "address": '123 Test Street',
        "purchaseDate": '2000-01-01',
      }
    }
    const result = await request(app).get('/purchase-date').send();

    expect(result.status).toBe(200);
    expect(result.type).toEqual('application/json');
    expect(result.body.data.address).toBe(expectedResponse.data.address);
    expect(result.body.data.purchaseDate).toBe(expectedResponse.data.purchaseDate);
  });
});
