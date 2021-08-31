import { Request } from "express"
import { matchAddress } from "../services/addressMatchingService";
import { getAllLandRegistryData } from "../datasources/landRegistryDataSource";
import { PurchaseDateResponse, RequestAddress } from "../types";

export const getPurchaseDateResponse = (request: Request): PurchaseDateResponse => {
  if(
    Object.keys(request.query).length > 0 &&
    !("buildingNumber" in request.query) ||
    !("street" in request.query) ||
    !("postCode" in request.query)
  ) {
    throw new Error();
  }

  const requestedAddress: RequestAddress = {
    BuildingNumber: request.query.buildingNumber as string,
    Street: request.query.street as string,
    Postcode: request.query.postCode as string,
  };

  const allLandRegistryData = getAllLandRegistryData();
  const matchedAddress = matchAddress(allLandRegistryData, requestedAddress);

  return ({
    address: `${requestedAddress.BuildingNumber} ${requestedAddress.Street}, ${requestedAddress.Postcode}`,
    purchaseDate: matchedAddress?.date_of_transfer as string,
  })
}