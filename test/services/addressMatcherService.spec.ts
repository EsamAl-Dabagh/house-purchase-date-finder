import { mockLandRegistryData } from '../mockData/mockData';
import { matchAddress } from '../../src/services/addressMatchingService';
import { RequestAddress } from '../../src/types';

describe('addressMatcherService', () => {
  it('should return LandRegistryData of suppied address if present', () => {
    const address: RequestAddress = {
      BuildingNumber: 2,
      Street: 'Churchside',
      Postcode: 'B79 9HE',
    };
    
    const response = matchAddress(mockLandRegistryData, address);

    expect(response).toBe(mockLandRegistryData[0]);
  });

  it('should return null if supplied address is not present', () => {
    const address: RequestAddress = {
      BuildingNumber: 99,
      Street: 'Not A Match Avenue',
      Postcode: 'B79 9HE',
    };

    const response = matchAddress(mockLandRegistryData, address);

    expect(response).toBeNull();
  });
});
