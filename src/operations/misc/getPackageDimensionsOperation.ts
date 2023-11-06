import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { toCamelCase } from '../../utils';

type OperationId = 'getPackageBoxSizes';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

type Request = {};

type JSONRequest = {};

export type GetPackageDimensionsJSONResponse = SuccessResponse;

export type GetPackageDimensionsResponse = ReturnType<typeof deserializeResponse>;

export interface GetPackageDimensionsResponseAdapter
  extends ResponseAdapter<GetPackageDimensionsResponse, GetPackageDimensionsJSONResponse> {}

export const getPackageDimensionsOperation: Operation<
  Request,
  JSONRequest,
  GetPackageDimensionsResponse,
  GetPackageDimensionsJSONResponse
> = {
  method: 'GET',
  name: 'getPackageBoxSizes',
  urlPathPattern: '/shipping/labels/boxes',
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

function deserializeResponse(jsonResponse: GetPackageDimensionsJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
