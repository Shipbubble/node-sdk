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
  ValidateAddressRequest,
  ValidateAddressResponseAdapter,
  WalletBalanceResponseAdapter,
  editAddressOperation,
  getSingleAddressOperation,
  getValidatedAddressesOperation,
  validateAddressesOperation,
  walletBalanceOperation,
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
    getValidatedAddresses: (request: GetValidatedAddressRequest): Promise<GetValidatedAddressResponseAdapter> => {
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
}
