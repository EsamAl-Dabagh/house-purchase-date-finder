import {
  LandRegistryData,
  RequestAddress
} from '../types';

export const matchAddress = (allLandRegistryData: LandRegistryData[], address: RequestAddress): LandRegistryData | null => {

  const matchedProperty = allLandRegistryData.filter((property) => (
      property.paon.toLowerCase() === address.BuildingNumber.toString().toLowerCase() &&
      property.street.toLowerCase() === address.Street.toLowerCase() &&
      property.postcode.toLowerCase() === address.Postcode.toLowerCase()
    ) 
  );

  if (!matchedProperty.length) {
    return null
  }

  // If there is a match there should only be one item in matchedProperty. If there are more items,
  // it means a property appears more than once in Land Registry data. 
  return matchedProperty[0];
};
