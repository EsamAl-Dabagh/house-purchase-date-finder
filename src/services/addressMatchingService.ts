import {
  LandRegistryData,
  RequestedAddress
} from '../types';

export const matchAddress = (allLandRegistryData: LandRegistryData[], address: RequestedAddress): LandRegistryData | null => {

  const matchedProperty = allLandRegistryData.filter((property) => (
      property.paon.toLowerCase() === address.buildingNumber.toString().toLowerCase() &&
      property.street.toLowerCase() === address.street.toLowerCase() &&
      property.postcode.toLowerCase() === address.postcode.toLowerCase()
    ) 
  );

  if (!matchedProperty.length) {
    return null
  }

  // If there is a match there should only be one item in matchedProperty. If there are more items,
  // it means a property appears more than once in Land Registry data. 
  return matchedProperty[0];
};
