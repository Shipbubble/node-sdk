import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { toCamelCase } from '../../utils';

type OperationId = 'getAccountSWalletBalance';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

type Request = {};

type JSONRequest = {};

export type WalletBalanceJSONResponse = SuccessResponse;

export type WalletBalanceResponse = ReturnType<typeof deserializeResponse>;

export interface WalletBalanceResponseAdapter
  extends ResponseAdapter<WalletBalanceResponse, WalletBalanceJSONResponse> {}

export const walletBalanceOperation: Operation<Request, JSONRequest, WalletBalanceResponse, WalletBalanceJSONResponse> =
  {
    method: 'GET',
    name: 'getAccountSWalletBalance',
    urlPathPattern: '/shipping/wallet/balance',
    getRequestUrlParams,
    deserializeResponse,
    serializeRequest,
    deserializeRequest,
  };

function getRequestUrlParams(_: Request) {
  return {};
}

function serializeRequest() {
  return undefined;
}

function deserializeRequest() {
  return {};
}

function deserializeResponse(jsonResponse: WalletBalanceJSONResponse) {
  return toCamelCase(jsonResponse);
}
