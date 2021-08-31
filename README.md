## House Purchase Date Finder

API to find the purchase date of a supplied address in an extract from the Land Registry.

### Set up
* Install dependencies: `yarn`
* Start the server: `yarn start` and then navigate to `localhost:8000`.

### How to use

Pass the following query parameters to `/purchase-date`:
* `street` _(required)_
* `postcode` _(required)_
* `buildingNumber`
* `buildingName`
* `subBuilding`

**Example:** `/purchase-date?buildingNumber=7&street=Elland%20Drive&postcode=CH66%204UR`  
**Will return:** 
```
{
  "address": "7 Elland Drive, CH66 4UR",
  "purchaseDate": "1995-03-31"
}
```

**Example:** `/purchase-date?buildingName=Montpellier%20House&street=Montpellier%20Crescent&subBuilding=6&postcode=CH45%209NF`  
**Will return:**
```
{
  "address": "6 Montpellier House, Montpellier Crescent, CH45 9NF",
  "purchaseDate": "2005-08-03"
}
```

If no match for an address is found, both properties will be null: 
```
{
  "address": null,
  "purchaseDate": null
}
```

### Tests
Jest and Supertest used for testing:  
`yarn test` to run test suite. 