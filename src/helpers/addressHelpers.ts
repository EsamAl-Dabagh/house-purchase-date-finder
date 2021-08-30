import { LandRegistryData } from "../types"

export const buildFullAddress = (property: LandRegistryData): string => {
  const saon = property.saon ? `${property.saon}, ` : '';

  return `${property.paon}, ${saon}${property.street}, ${property.locality}, ${property.city}, ${property.district}, ${property.county}, ${property.postcode}`;
};
