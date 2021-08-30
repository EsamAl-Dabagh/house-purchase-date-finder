import { mockLandRegistryData } from '../mockData/mockData';
import { matchAddress } from '../../src/services/addressMatchingService';

describe('addressMatcherService', () => {
  it('should return LandRegistryData of suppied address if present', () => {
    const address = '2-churchside-harlaston-tamworth-lichfield-staffordshire-b79-9he';
    
    const response = matchAddress(mockLandRegistryData, address);

    expect(response).toBe(mockLandRegistryData[0]);
  });
})