import { Request } from 'express';
import { getAllLandRegistryData } from '../../src/datasources/landRegistryDataSource';
import { getPurchaseDateResponse } from '../../src/handlers/handlers';
import { matchAddress } from '../../src/services/addressMatchingService';
import { PurchaseDateResponse } from '../../src/types';
import { mockLandRegistryData } from '../mockData/mockData';

jest.mock('../../src/datasources/landRegistryDataSource.ts', () => ({
  getAllLandRegistryData: jest.fn(),
}));

jest.mock('../../src/services/addressMatchingService', () => ({
  matchAddress: jest.fn(),
}));

describe('getPurchaseDateResponse', () => {
  it('should include supplied address in response', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '2',
        street: 'Churchside',
        postcode: 'B79 9HE'
      }
    } as unknown as Request;

    (matchAddress as jest.Mock).mockReturnValueOnce(mockLandRegistryData[0]);

    const address = '2 Churchside, B79 9HE';
    const response = getPurchaseDateResponse(mockRequest);

    expect(response.address).toBe(address);
  });

  it('should include purchase date in response', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '2',
        street: 'Churchside',
        postcode: 'B79 9HE'
      }
    } as unknown as Request;

    (matchAddress as jest.Mock).mockReturnValueOnce(mockLandRegistryData[0]);

    const expectedPurchaseDate = '1995-07-21';

    const response = getPurchaseDateResponse(mockRequest);

    expect(response.purchaseDate).toBe(expectedPurchaseDate);
  });

  it('should throw an error if street does not exist in querystring', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '123',
        postcode: 'B79 9HE'
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
        buildingNumber: '2',
        street: 'Churchside',
        postcode: 'B79 9HE'
      }
    } as unknown as Request;

    getPurchaseDateResponse(mockRequest);

    expect(getAllLandRegistryData).toBeCalledTimes(1);
  });

  it('should return null for address and purchase date if matching data not found in Land Registry data', () => {
    const mockRequest: Request = {
      query: {
        buildingNumber: '7',
        street: 'Street Does Not Exist',
        postcode: 'AB12 8GU'
      }
    } as unknown as Request;

    (matchAddress as jest.Mock).mockReturnValueOnce(null);

    const expectedResponse: PurchaseDateResponse = {
      address: null,
      purchaseDate: null,
    }

    const response = getPurchaseDateResponse(mockRequest);

    expect(response).toEqual(expectedResponse);
  });
});
