import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'validateAddress';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface ValidateAddressRequest extends Camelize<RequestParams> {}

export type ValidateAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type ValidateAddressJSONResponse = SuccessResponse;

export type ValidateAddressResponse = ReturnType<typeof deserializeResponse>;

export interface ValidateAddressResponseAdapter
  extends ResponseAdapter<ValidateAddressResponse, ValidateAddressJSONResponse> {}

export const validateAddressesOperation: Operation<
  ValidateAddressRequest,
  ValidateAddressJSONRequest,
  ValidateAddressResponse,
  ValidateAddressJSONResponse
> = {
  method: 'POST',
  name: 'validateAddress',
  urlPathPattern: '/shipping/address/validate',
  bodyParamNames: ['address', 'email', 'name', 'phone'],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: ValidateAddressRequest) {
  return request;
}

function serializeRequest(request: ValidateAddressRequest) {
  return request;
}

function deserializeRequest(jsonRequest: ValidateAddressJSONRequest) {
  return jsonRequest;
}

function deserializeResponse(jsonResponse: ValidateAddressJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
