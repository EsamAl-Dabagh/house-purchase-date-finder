import { LandRegistryData, MatchedAddressData } from '../types';

export const matchAddress = (allLandRegistryData: LandRegistryData[], address: string): MatchedAddressData => {

  const matchedProperty = allLandRegistryData.filter((property) => {
    
  });

  return {
    price: '',
    date_of_transfer: '',
    postcode: '',
    property_type: '',
    old_new: '',
    duration: '',
    paon: '',
    saon: '',
    street: '',
    locality: '',
    city: '',
    district: '',
    county: '',
    ppd_category_type: '',
    record_status: '',
    fullAddress: '',
  }
};
