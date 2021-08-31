import { mockLandRegistryData } from '../mockData/mockData';
import { matchAddress } from '../../src/services/addressMatchingService';
import { RequestedAddress } from '../../src/types';

describe('addressMatcherService', () => {
  it('should return LandRegistryData of suppied address if present', () => {
    const address: RequestedAddress = {
      buildingNumber: '2',
      street: 'Churchside',
      postcode: 'B79 9HE',
    };
    
    const response = matchAddress(mockLandRegistryData, address);

    expect(response).toBe(mockLandRegistryData[0]);
  });

  it('should return null if supplied address is not present', () => {
    const address: RequestedAddress = {
      buildingNumber: '99',
      street: 'Not A Match Avenue',
      postcode: 'B79 9HE',
    };

    const response = matchAddress(mockLandRegistryData, address);

    expect(response).toBeNull();
  });
});
