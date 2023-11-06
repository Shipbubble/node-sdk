import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'editAddress';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface EditAddressRequest extends Camelize<Omit<RequestParams, 'address_code'>> {
  addressCode: number;
}

export type EditAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type EditAddressJSONResponse = SuccessResponse;

export type EditAddressResponse = ReturnType<typeof deserializeResponse>;

export interface EditAddressResponseAdapter extends ResponseAdapter<EditAddressResponse, EditAddressJSONResponse> {}

export const editAddressOperation: Operation<
  EditAddressRequest,
  EditAddressJSONRequest,
  EditAddressResponse,
  EditAddressJSONResponse
> = {
  method: 'PATCH',
  name: 'editAddress',
  urlPathPattern: '/shipping/address/{addressCode}',
  bodyParamNames: ['email', 'name', 'phone'],
  urlPathParamNames: ['addressCode'],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: EditAddressRequest) {
  return {
    addressCode: request.addressCode.toString(),
  };
}

function getRequestBody(request: EditAddressRequest) {
  return {
    email: request.email,
    name: request.name,
    phone: request.phone,
  };
}

function serializeRequest(request: EditAddressRequest) {
  return {
    ...request,
    addressCode: request.addressCode.toString(),
  };
}

function deserializeRequest(jsonRequest: EditAddressJSONRequest) {
  return {
    ...jsonRequest,
    addressCode: Number(jsonRequest.addressCode),
  };
}

function deserializeResponse(jsonResponse: EditAddressJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
