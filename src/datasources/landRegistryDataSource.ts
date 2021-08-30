import { LandRegistryData } from '../types';
import { default as propertyPricePaid } from '../../data/property_price_paid.json';

export const getAllLandRegistryData = (): LandRegistryData[] => ( propertyPricePaid );