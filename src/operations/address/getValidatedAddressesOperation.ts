import { PaginatedOperation, PaginatedResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, maybe, toCamelCase } from '../../utils';

type OperationId = 'getValidatedAddresses';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface GetValidatedAddressRequest extends Camelize<Omit<RequestParams, 'PerPage' | 'Page'>> {
  PerPage?: number;
  Page?: number;
}

export type GetValidatedAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type GetValidatedAddressJSONResponse = SuccessResponse;

export type GetValidatedAddressResponse = ReturnType<typeof deserializeResponse>;

export interface GetValidatedAddressResponseAdapter
  extends PaginatedResponseAdapter<GetValidatedAddressResponse, GetValidatedAddressJSONResponse> {}

export const getValidatedAddressesOperation: PaginatedOperation<
  GetValidatedAddressRequest,
  GetValidatedAddressJSONRequest,
  GetValidatedAddressResponse,
  GetValidatedAddressJSONResponse
> = {
  method: 'GET',
  name: 'getValidatedAddresses',
  urlPathPattern: '/shipping/address',
  urlSearchParamNames: ['Page', 'PerPage'],
  firstPageIndex: 1,
  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: GetValidatedAddressRequest) {
  return {
    PerPage: maybe(request.PerPage, String),
    Page: maybe(request.Page, String),
  };
}

function serializeRequest(request: GetValidatedAddressRequest) {
  return {
    PerPage: maybe(request.PerPage, String),
    Page: maybe(request.Page, String),
  };
}

function deserializeRequest(jsonRequest: GetValidatedAddressJSONRequest) {
  return {
    PerPage: maybe(jsonRequest.PerPage, Number),
    Page: maybe(jsonRequest.Page, Number),
  };
}

function deserializeResponse(jsonResponse: GetValidatedAddressJSONResponse) {
  return (jsonResponse.data.results || []).map((result) => ({
    ...toCamelCase(result),
  }));
}
