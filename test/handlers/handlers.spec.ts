import { Request } from 'express';
import { getAllLandRegistryData } from '../../src/datasources/landRegistryDataSource';
import { getPurchaseDateResponse } from '../../src/handlers/handlers';

jest.mock('../../src/datasources/landRegistryDataSource.ts', () => ({
  getAllLandRegistryData: jest.fn(),
}))

describe('getPurchaseDateResponse', () => {
  it('should include supplied address in response', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '123',
        street: 'Test Street',
        postCode: 'B79 9HE'
      }
    } as unknown as Request;

    const address = '123 Test Street, B79 9HE';
    const response = getPurchaseDateResponse(mockRequest);

    expect(response.address).toBe(address);
  });
  
  it('should throw an error if buildingNumber does not exist in querystring', () => {
    const mockRequest: Request = {
      query: {
        street: 'Test Street',
        postCode: 'B79 9HE'
      }
    } as unknown as Request;

    expect(() => {
      getPurchaseDateResponse(mockRequest)
    }).toThrowError();
  });

  it('should throw an error if street does not exist in querystring', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '123',
        postCode: 'B79 9HE'
      }
    } as unknown as Request;

    expect(() => {
      getPurchaseDateResponse(mockRequest)
    }).toThrowError();
  });

  it('should throw an error if postCode does not exist in querystring', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '123',
        street: 'Test Street',
      }
    } as unknown as Request;

    expect(() => {
      getPurchaseDateResponse(mockRequest)
    }).toThrowError();
  });

  it('should retrieve land registry data', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '123',
        street: 'Test Street',
        postCode: 'B79 9HE'
      }
    } as unknown as Request;

    getPurchaseDateResponse(mockRequest);

    expect(getAllLandRegistryData).toBeCalledTimes(1);
  });
});