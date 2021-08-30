import { Request } from "express"
import { getAllLandRegistryData } from "../datasources/landRegistryDataSource";
import { PurchaseDateResponse } from "../types";

export const getPurchaseDateResponse = (request: Request): PurchaseDateResponse => {
  if(Object.keys(request.query).length > 0 && !("address" in request.query)) {
    throw new Error();
  }

  getAllLandRegistryData();

  return ({
    address: `${request.query.address}`,
    purchaseDate: '2020-05-12',
  })
}