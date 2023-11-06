import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'createShippingLabel';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface CreateShipmentRequest extends Camelize<Required<RequestParams>> {
  courierId: string;
  insuranceCode?: string;
}

export type CreateShipmentJSONRequest = ReturnType<typeof serializeRequest>;

export type CreateShipmentJSONResponse = SuccessResponse;

export type CreateShipmentResponse = ReturnType<typeof deserializeResponse>;

export interface CreateShipmentResponseAdapter
  extends ResponseAdapter<CreateShipmentResponse, CreateShipmentJSONResponse> {}

export const createShipmentOperation: Operation<
  CreateShipmentRequest,
  CreateShipmentJSONRequest,
  CreateShipmentResponse,
  CreateShipmentJSONResponse
> = {
  method: 'POST',
  name: 'createShippingLabel',
  urlPathPattern: '/shipping/labels',
  bodyParamNames: ['courier_id', 'insurance_code', 'request_token', 'service_code'],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: CreateShipmentRequest) {
  return {
    request_token: request.requestToken,
    service_code: request.serviceCode,
    courier_id: request.courierId,
    insurance_code: request.insuranceCode,
  };
}

function serializeRequest(request: CreateShipmentRequest) {
  return {
    request_token: request.requestToken,
    service_code: request.serviceCode,
    courier_id: request.courierId,
    insurance_code: request.insuranceCode,
  };
}

function deserializeRequest(jsonRequest: CreateShipmentJSONRequest) {
  return toCamelCase(jsonRequest);
}

function deserializeResponse(jsonResponse: CreateShipmentJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
