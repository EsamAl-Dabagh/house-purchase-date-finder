import { Request } from 'express';
import { getPurchaseDateResponse } from '../../src/handlers/handlers';

describe('getPurchaseDateResponse', () => {
  it('should include supplied address in response', () => {
    const mockRequest: Request = {
      query: {
        address: '123 Test Street',
      }
    } as unknown as Request;

    const address = '123 Test Street';
    const response = getPurchaseDateResponse(mockRequest);

    expect(response.address).toBe(address);
  });
  
  it('should throw an error if address does not exist in querystring', () => {
    const mockRequest = {
      query: {
        notAddress: '123 Test Street',
      }
    } as unknown as Request;

    expect(() => {
      getPurchaseDateResponse(mockRequest)
    }).toThrowError();
  });
});