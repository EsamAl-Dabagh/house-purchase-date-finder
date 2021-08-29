import { Request } from "express"

export interface PurchaseDateResponse {
  address: string;
  purchaseDate: string;
}

export const getPurchaseDateResponse = (request: Request): PurchaseDateResponse => {
  if(Object.keys(request.query).length > 0 && !("address" in request.query)) {
    throw new Error();
  }

  return ({
    address: `${request.query.address}`,
    purchaseDate: '2020-05-12',
  })
}