import { OperationResolver, PaginatedOperationResolver } from './core';
import { Config, SBConfigSetup } from './core/config';
import { SBConfigValues } from './core/config/SBConfigValues';
import {
  EditAddressRequest,
  EditAddressResponseAdapter,
  GetSingleAddressRequest,
  GetSingleAddressResponseAdapter,
  GetValidatedAddressRequest,
  GetValidatedAddressResponseAdapter,
  GetPackageCategoriesResponseAdapter,
  GetPackageDimensionsResponseAdapter,
  ValidateAddressRequest,
  ValidateAddressResponseAdapter,
  WalletBalanceResponseAdapter,
  editAddressOperation,
  getSingleAddressOperation,
  getValidatedAddressesOperation,
  getPackageCategoriesOperation,
  getPackageDimensionsOperation,
  validateAddressesOperation,
  walletBalanceOperation,
  getCouriersOperation,
  GetCouriersResponseAdapter,
  RequestShippingRatesRequest,
  requestShippingRatesOperation,
  RequestShippingRatesResponseAdapter,
  RequestShippingRatesFromCouriersResponseAdapter,
  RequestShippingRatesFromCouriersRequest,
  requestShippingRatesFromCouriersOperation,
  GetInsuranceRatesRequest,
  GetInsuranceRatesResponseAdapter,
  getInsuranceRatesOperation,
  CreateShipmentRequest,
  CreateShipmentResponseAdapter,
  createShipmentOperation,
  CancelShipmentRequest,
  CancelShipmentResponseAdapter,
  cancelShipmentOperation,
  GetShipmentsRequest,
  GetShipmentsResponseAdapter,
  getShipmentsOperation,
} from './operations';

const BASE_URL = 'https://api.shipbubble.com/v1';

export class Shipbubble {
  protected config: Config;

  // constructor(configOptions: SBConfigValues) {
  //   this.config = new Config();
  //   this.setup();
  //   this.config.merge(configOptions);
  // }

  private setup() {
    SBConfigSetup.register(this.config);
  }

  public init(configOptions: SBConfigValues) {
    this.config = new Config();
    this.setup();
    this.config.merge(configOptions);
  }

  // SDK methods
  public readonly wallet = {
    walletBalance: (): Promise<WalletBalanceResponseAdapter> => {
      return new OperationResolver(walletBalanceOperation, BASE_URL, this.config).fetch({});
    },
  };

  public readonly address = {
    getValidatedAddresses: (request?: GetValidatedAddressRequest): Promise<GetValidatedAddressResponseAdapter> => {
      return new PaginatedOperationResolver(getValidatedAddressesOperation, BASE_URL, this.config).fetch(request);
    },
    validateAddress: (request: ValidateAddressRequest): Promise<ValidateAddressResponseAdapter> => {
      return new OperationResolver(validateAddressesOperation, BASE_URL, this.config).fetch(request);
    },
    editAddress: (request: EditAddressRequest): Promise<EditAddressResponseAdapter> => {
      return new OperationResolver(editAddressOperation, BASE_URL, this.config).fetch(request);
    },
    getSingleAddress: (request: GetSingleAddressRequest): Promise<GetSingleAddressResponseAdapter> => {
      return new OperationResolver(getSingleAddressOperation, BASE_URL, this.config).fetch(request);
    },
  };

  public readonly misc = {
    getPackageCategories: (): Promise<GetPackageCategoriesResponseAdapter> => {
      return new OperationResolver(getPackageCategoriesOperation, BASE_URL, this.config).fetch({});
    },
    getPackageDimensions: (): Promise<GetPackageDimensionsResponseAdapter> => {
      return new OperationResolver(getPackageDimensionsOperation, BASE_URL, this.config).fetch({});
    },
    getCouriers: (): Promise<GetCouriersResponseAdapter> => {
      return new OperationResolver(getCouriersOperation, BASE_URL, this.config).fetch({});
    },
  };

  public readonly insurance = {
    getInsuranceRates: (request: GetInsuranceRatesRequest): Promise<GetInsuranceRatesResponseAdapter> => {
      return new OperationResolver(getInsuranceRatesOperation, BASE_URL, this.config).fetch(request);
    },
  };

  public readonly rates = {
    requestShippingRates: (request: RequestShippingRatesRequest): Promise<RequestShippingRatesResponseAdapter> => {
      return new OperationResolver(requestShippingRatesOperation, BASE_URL, this.config).fetch(request);
    },
    requestShippingRatesFromCouriers: (
      request: RequestShippingRatesFromCouriersRequest,
    ): Promise<RequestShippingRatesFromCouriersResponseAdapter> => {
      return new OperationResolver(requestShippingRatesFromCouriersOperation, BASE_URL, this.config).fetch(request);
    },
  };

  public readonly shipments = {
    createShipment: (request: CreateShipmentRequest): Promise<CreateShipmentResponseAdapter> => {
      return new OperationResolver(createShipmentOperation, BASE_URL, this.config).fetch(request);
    },
    cancelShipment: (request: CancelShipmentRequest): Promise<CancelShipmentResponseAdapter> => {
      return new OperationResolver(cancelShipmentOperation, BASE_URL, this.config).fetch(request);
    },
  };

  public readonly tracking = {
    getShipments: (request?: GetShipmentsRequest): Promise<GetShipmentsResponseAdapter> => {
      return new PaginatedOperationResolver(getShipmentsOperation, BASE_URL, this.config).fetch(request);
    },
  };
}
