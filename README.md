# shipbubble-node-sdk

<div align="center">
    <a align="center" href="https://www.shipbubble.com/" target="_blank">
      <img src="https://res.cloudinary.com/delivry/image/upload/v1693997143/app_assets/white-shipbubble-logo_ox2w53.svg" alt="Shipbubble JS SDK" height=200/>
    </a>
    <h1 align="center">Shipbubble SDK (JavaScript / TypeScript)</h1>
    <img alt="npm" src="https://img.shields.io/npm/v/shipbubble-sdk?label=version">
    <img src="https://img.shields.io/github/last-commit/shipbubble-sdk/">
    <img src="https://img.shields.io/bundlephobia/minzip/shipbubble-sdk">
    <img src="https://img.shields.io/npm/types/shipbubble-sdk">
  </p>
  <p>
    <a href="https://docs.shipbubble.com">Documentation</a>
    ·
    <a href="https://docs.shipbubble.com">API Reference</a>
    ·
    <a href="https://docs.shipbubble.com">Getting Started</a>
  </p>
  <p>
    The Shipbubble SDK is a JavaScript library that allows you to interact with the Shipbubble API from a Node.js application. It provides a way to authenticate, make requests, and handle responses.
  </p>
  <br/>
</div>

---

# 🚀 Quick start

## Installation

Install the package using npm or yarn:

```bash
npm install shipbubble
```

or `yarn`

```bash
yarn add shipbubble
```

## Usage

After installing the package, you simply need to import the package and initialize it with your API key using the `init` method.

```js
import Shipbubble from 'shipbubble';

Shipbubble.init({
  apiKey: 'SHIPBUBBLE_API_KEY',
});
```

## Making requests

After initializing the SDK, you can start making requests to the Shipbubble API.

```js
const response = await Shipbubble.wallet.walletBalance();
console.log(response);
```

# Response types

The Shipbubble SDK returns two types of responses: `raw` and `formatted`. The `raw` response returns the data as it is from the API, while the `formatted` response converts the response to camel case for camel case lovers and also formats date strings and returns the date object.

```js
const response = await Shipbubble.address.validateAddress({
  address: '62 Old yaba road, yaba, Lagos',
  email: 'exampleemail@mail.com',
  phone: '08123456789',
  name: 'John Doe',
});
console.log(response.raw);
console.log(response.formatted);
```

## Pagination

The Shipbubble SDK handles pagination for you. If a response has a `next` link, you can use the `next` methods to fetch the next page of the response. you can also use the `hasNext` method to check if there is a next page.
The `pagination` object is also available on the response object, and it contains the metadata for the pagination if you wish to handle next page calls manually.

```js
const response = await Shipbubble.address.getValidatedAddresses({
  Page: 1,
  PerPage: 5,
});

if (response.hasNext()) {
  const nextPage = await response.next();
  console.log(nextPage);
}
```

# 📦 Available methods

The Shipbubble SDK provides methods to interact with the Shipbubble API. Below are some of the available methods:

All these methods are available on the `Shipbubble` object and can be accessed like so:

```js
Shipbubble.[module].[method](Options);
```

- wallet
  - [walletBalance](https://docs.shipbubble.com/api-reference/wallet/get-shipping-wallet-balance)
- address
  - [getValidatedAddresses](https://docs.shipbubble.com/api-reference/addresses/get-validated-addresses)
  - [validateAddress](https://docs.shipbubble.com/api-reference/addresses/validate-address-global)
  - [editAddress](https://docs.shipbubble.com/api-reference/addresses/edit-address-details)
  - [getSingleAddress](https://docs.shipbubble.com/api-reference/addresses/get-single-address-details)
- misc
  - [getPackageCategories](https://docs.shipbubble.com/api-reference/package-categories)
  - [getPackageDimensions](https://docs.shipbubble.com/api-reference/package-dimensions)
  - [getCouriers](https://docs.shipbubble.com/api-reference/couriers)
- insurance
  - [getInsuranceRates](https://docs.shipbubble.com/api-reference/insurance/get-insurance-rates)
- rates
  - [requestShippingRates](https://docs.shipbubble.com/api-reference/rates/request-shipping-rates)
  - [requestShippingRatesFromCouriers](https://docs.shipbubble.com/api-reference/rates/request-shipping-rates-from-selected-couriers)
  - [editRequestTokenDetails](https://docs.shipbubble.com/api-reference/rates/edit-request-token-details)
- shipments
  - [createShipment](https://docs.shipbubble.com/api-reference/shipments/create-shipment)
  - [cancelShipment](https://docs.shipbubble.com/api-reference/shipments/cancel-shipment)
- tracking
  - [getShipments](https://docs.shipbubble.com/api-reference/tracking/get-shipments)

# 📝 TypeScript support

The Shipbubble SDK is written in TypeScript and provides types for all the methods and their options. You can import the method options and return interface from the package and use them in your application.

```ts
import { GetValidatedAddressRequest, GetValidatedAddressResponseAdapter } from 'shipbubble';

const options: GetValidatedAddressRequest = {
  Page: 1,
  PerPage: 5,
};

const response = await Shipbubble.address.getValidatedAddresses(options);
```

# 📚 Documentation

For more information on how to use the Shipbubble SDK, check out the [official documentation](https://docs.shipbubble.com).
