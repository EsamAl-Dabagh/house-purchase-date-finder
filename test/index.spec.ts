import request from 'supertest';
import { app } from '../src/index';

describe('GET /', () => {
  it('should return 200', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
  })
});
