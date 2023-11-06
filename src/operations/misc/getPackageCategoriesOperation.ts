import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { toCamelCase } from '../../utils';

type OperationId = 'getLabelCategories';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

type Request = {};

type JSONRequest = {};

export type GetPackageCategoriesJSONResponse = SuccessResponse;

export type GetPackageCategoriesResponse = ReturnType<typeof deserializeResponse>;

export interface GetPackageCategoriesResponseAdapter
  extends ResponseAdapter<GetPackageCategoriesResponse, GetPackageCategoriesJSONResponse> {}

export const getPackageCategoriesOperation: Operation<
  Request,
  JSONRequest,
  GetPackageCategoriesResponse,
  GetPackageCategoriesJSONResponse
> = {
  method: 'GET',
  name: 'getLabelCategories',
  urlPathPattern: '/shipping/labels/categories',
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

function deserializeResponse(jsonResponse: GetPackageCategoriesJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
