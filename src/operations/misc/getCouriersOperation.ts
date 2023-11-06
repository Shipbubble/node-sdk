import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { toCamelCase } from '../../utils';

type OperationId = 'listAvailableCarriers';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

type Request = {};

type JSONRequest = {};

export type GetCouriersJSONResponse = SuccessResponse;

export type GetCouriersResponse = ReturnType<typeof deserializeResponse>;

export interface GetCouriersResponseAdapter extends ResponseAdapter<GetCouriersResponse, GetCouriersJSONResponse> {}

export const getCouriersOperation: Operation<Request, JSONRequest, GetCouriersResponse, GetCouriersJSONResponse> = {
  method: 'GET',
  name: 'listAvailableCarriers',
  urlPathPattern: '/shipping/couriers',
  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(_: Request) {
  return {};
}

function serializeRequest() {
  return {};
}

function deserializeRequest() {
  return {};
}

function deserializeResponse(jsonResponse: GetCouriersJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
