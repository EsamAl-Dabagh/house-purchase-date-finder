import { Request } from "express"
import { matchAddress } from "../services/addressMatchingService";
import { getAllLandRegistryData } from "../datasources/landRegistryDataSource";
import { PurchaseDateResponse, RequestedAddress } from "../types";
import { ErrorRequestHandler } from 'express';

export const getPurchaseDateResponse = (request: Request): PurchaseDateResponse => {
  if(
    Object.keys(request.query).length > 0 &&
    !("buildingNumber" in request.query) ||
    !("street" in request.query) ||
    !("postcode" in request.query)
  ) {
    throw new Error('Invalid querystring parameters');
  }

  const requestedAddress: RequestedAddress = {
    buildingNumber: request.query.buildingNumber as string,
    street: request.query.street as string,
    postcode: request.query.postcode as string,
  };

  const allLandRegistryData = getAllLandRegistryData();
  const matchedAddress = matchAddress(allLandRegistryData, requestedAddress);

  return ({
    address: matchedAddress ? `${requestedAddress.buildingNumber} ${requestedAddress.street}, ${requestedAddress.postcode}` : null,
    purchaseDate: matchedAddress ? matchedAddress?.date_of_transfer as string : null,
  })
}

export const errorHandler: ErrorRequestHandler = (err, request, response, next): void => {
  response.status(err.status || 500);
  response.render('error', {
      message: err.message,
      error: {}
  });
};
