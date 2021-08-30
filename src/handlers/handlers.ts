import { Request } from "express"
import { getAllLandRegistryData } from "../datasources/landRegistryDataSource";
import { PurchaseDateResponse } from "../types";

export const getPurchaseDateResponse = (request: Request): PurchaseDateResponse => {
  if(
    Object.keys(request.query).length > 0 &&
    !("buildingNumber" in request.query) ||
    !("street" in request.query) ||
    !("postCode" in request.query)
  ) {
    throw new Error();
  }

  const allLandRegistryData = getAllLandRegistryData();

  return ({
    address: `${request.query.buildingNumber} ${request.query.street}, ${request.query.postCode}`,
    purchaseDate: '2020-05-12',
  })
}