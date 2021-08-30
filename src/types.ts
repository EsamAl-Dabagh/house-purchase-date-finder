export interface LandRegistryData {
  price: string;
  date_of_transfer: string;
  postcode: string;
  property_type: string;
  old_new: string;
  duration: string;
  paon: string;
  saon: string;
  street: string;
  locality: string;
  city: string;
  district: string;
  county: string;
  ppd_category_type: string;
  record_status: string;
}

export interface PurchaseDateResponse {
  address: string;
  purchaseDate: string;
}