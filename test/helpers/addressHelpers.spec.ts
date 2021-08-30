import { mockLandRegistryData } from "../mockData/mockData";
import { buildFullAddress } from '../../src/helpers/addressHelpers';

describe('buildFullAddress', () => {
  it('should return a fully built address given LandRegistryData', () => {
    const mockProperty = mockLandRegistryData[0];

    const expectedAddress = '2, CHURCHSIDE, HARLASTON, TAMWORTH, LICHFIELD, STAFFORDSHIRE, B79 9HE';

    expect(buildFullAddress(mockProperty)).toBe(expectedAddress);
  });
});
