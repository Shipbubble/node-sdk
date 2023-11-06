import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'getSingleAddress';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface GetSingleAddressRequest extends Camelize<Omit<RequestParams, 'address_code'>> {
  addressCode: number;
}

export type GetSingleAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type GetSingleAddressJSONResponse = SuccessResponse;

export type GetSingleAddressResponse = ReturnType<typeof deserializeResponse>;

export interface GetSingleAddressResponseAdapter
  extends ResponseAdapter<GetSingleAddressResponse, GetSingleAddressJSONResponse> {}

export const getSingleAddressOperation: Operation<
  GetSingleAddressRequest,
  GetSingleAddressJSONRequest,
  GetSingleAddressResponse,
  GetSingleAddressJSONResponse
> = {
  method: 'GET',
  name: 'getSingleAddress',
  urlPathPattern: '/shipping/address/{addressCode}',
  urlPathParamNames: ['addressCode'],
  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: GetSingleAddressRequest) {
  return {
    addressCode: request.addressCode.toString(),
  };
}

function serializeRequest(request: GetSingleAddressRequest) {
  return {
    ...request,
    addressCode: request.addressCode.toString(),
  };
}

function deserializeRequest(jsonRequest: GetSingleAddressJSONRequest) {
  return {
    ...jsonRequest,
    addressCode: Number(jsonRequest.addressCode),
  };
}

function deserializeResponse(jsonResponse: GetSingleAddressJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
