import { Request } from "express"
import { matchAddress } from "../services/addressMatchingService";
import { getAllLandRegistryData } from "../datasources/landRegistryDataSource";
import { PurchaseDateResponse, RequestedAddress } from "../types";

const formatBeginningOfAddress = (requestedAddress: RequestedAddress): string => {
  if (requestedAddress.buildingNumber && !requestedAddress.buildingName) {
    return `${requestedAddress.buildingNumber}`;
  }

  if(requestedAddress.buildingName && requestedAddress.subBuilding && requestedAddress.buildingNumber) {
    return `${requestedAddress.buildingNumber ?? ''} ${requestedAddress.subBuilding ?? ''} ${requestedAddress.buildingName ?? ''}`
  }

  if (requestedAddress.buildingName && requestedAddress.subBuilding) {
    return `${requestedAddress.subBuilding ?? ''} ${requestedAddress.buildingName ?? ''},`;
  }

  return '';
}

export const getPurchaseDateResponse = (request: Request): PurchaseDateResponse => {
  if(
    Object.keys(request.query).length > 0 &&
    !("street" in request.query) ||
    !("postcode" in request.query)
  ) {
    throw new Error('Invalid querystring parameters');
  }

  const requestedAddress: RequestedAddress = {
    street: request.query.street as string,
    postcode: request.query.postcode as string,
    buildingNumber: request.query.buildingNumber as string || undefined,
    buildingName: request.query.buildingName as string || undefined,
    subBuilding: request.query.subBuilding as string || undefined,
  };

  const allLandRegistryData = getAllLandRegistryData();
  const matchedAddress = matchAddress(allLandRegistryData, requestedAddress);

  return ({
    address: matchedAddress ? `${formatBeginningOfAddress(requestedAddress)} ${requestedAddress.street}, ${requestedAddress.postcode}` : null,
    purchaseDate: matchedAddress ? matchedAddress?.date_of_transfer as string : null,
  })
}
