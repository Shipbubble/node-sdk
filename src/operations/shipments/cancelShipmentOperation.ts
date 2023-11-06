import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'cancelShipmentLabel';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface CancelShipmentRequest extends Camelize<Required<RequestParams>> {}

export type CancelShipmentJSONRequest = ReturnType<typeof serializeRequest>;

export type CancelShipmentJSONResponse = SuccessResponse;

export type CancelShipmentResponse = ReturnType<typeof deserializeResponse>;

export interface CancelShipmentResponseAdapter
  extends ResponseAdapter<CancelShipmentResponse, CancelShipmentJSONResponse> {}

export const cancelShipmentOperation: Operation<
  CancelShipmentRequest,
  CancelShipmentJSONRequest,
  CancelShipmentResponse,
  CancelShipmentJSONResponse
> = {
  method: 'POST',
  name: 'cancelShipmentLabel',
  urlPathPattern: '/shipping/labels/cancel/{order_id}',
  urlPathParamNames: ['order_id'],
  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: CancelShipmentRequest) {
  return {
    order_id: request.orderId,
  };
}

function serializeRequest(request: CancelShipmentRequest) {
  return {
    order_id: request.orderId,
  };
}

function deserializeRequest(jsonRequest: CancelShipmentJSONRequest) {
  return toCamelCase(jsonRequest);
}

function deserializeResponse(jsonResponse: CancelShipmentJSONResponse) {
  return true;
}
