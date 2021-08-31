import {
  LandRegistryData,
  RequestedAddress
} from '../types';

export const matchAddress = (allLandRegistryData: LandRegistryData[], requestedAddress: RequestedAddress): LandRegistryData | null => {

  const matchedProperty = allLandRegistryData.filter((property) => {
      if(
        property.paon.toLowerCase() === requestedAddress.buildingName?.toLowerCase() &&
        property.saon.toLowerCase() === requestedAddress.subBuilding?.toLowerCase() &&
        property.street.toLowerCase() === requestedAddress.street.toLowerCase() &&
        property.postcode.toLowerCase() === requestedAddress.postcode.toLowerCase()
      ) {
        return true;
      }
      
      if(
        property.paon.toLowerCase() === requestedAddress.buildingNumber?.toString().toLowerCase() &&
        property.street.toLowerCase() === requestedAddress.street.toLowerCase() &&
        property.postcode.toLowerCase() === requestedAddress.postcode.toLowerCase()
      ) {
        return true;
      }
    }
  );

  if (!matchedProperty.length) {
    return null
  }

  // If there is a match there should only be one item in matchedProperty. If there are more items,
  // it means a property appears more than once in Land Registry data. 
  return matchedProperty[0];
};
