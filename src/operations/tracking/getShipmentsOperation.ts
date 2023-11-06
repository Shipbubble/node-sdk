import { PaginatedOperation, PaginatedResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, maybe, toCamelCase } from '../../utils';

type OperationId = 'getShippingLabels';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface GetShipmentsRequest
  extends Camelize<Omit<RequestParams, 'start_date' | 'end_date' | 'PerPage' | 'Page'>> {
  PerPage?: number;
  Page?: number;
  startDate?: Date;
  endDate?: Date;
}

export type GetShipmentsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetShipmentsJSONResponse = SuccessResponse;

export type GetShipmentsResponse = ReturnType<typeof deserializeResponse>;

export interface GetShipmentsResponseAdapter
  extends PaginatedResponseAdapter<GetShipmentsResponse, GetShipmentsJSONResponse> {}

export const getShipmentsOperation: PaginatedOperation<
  GetShipmentsRequest,
  GetShipmentsJSONRequest,
  GetShipmentsResponse,
  GetShipmentsJSONResponse
> = {
  method: 'GET',
  name: 'getShippingLabels',
  urlPathPattern: '/shipping/labels',
  urlSearchParamNames: ['Page', 'PerPage', 'Status', 'start_date', 'end_date'],
  firstPageIndex: 1,
  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: GetShipmentsRequest) {
  return {
    PerPage: maybe(request.PerPage, String),
    Page: maybe(request.Page, String),
    Status: maybe(request.Status, String),
    start_date: maybe(request.startDate, (date) => date.toISOString().split('T')[0]),
    end_date: maybe(request.endDate, (date) => date.toISOString().split('T')[0]),
  };
}

function serializeRequest(request: GetShipmentsRequest) {
  return {
    PerPage: maybe(request.PerPage, String),
    Page: maybe(request.Page, String),
    Status: maybe(request.Status, String),
    start_date: maybe(request.startDate, (date) => date.toISOString().split('T')[0]),
    end_date: maybe(request.endDate, (date) => date.toISOString().split('T')[0]),
  };
}

function deserializeRequest(jsonRequest: GetShipmentsJSONRequest) {
  return {
    PerPage: maybe(jsonRequest.PerPage, Number),
    Page: maybe(jsonRequest.Page, Number),
    Status: maybe(jsonRequest.Status, String),
    startDate: maybe(jsonRequest.start_date, (date) => new Date(date)),
    endDate: maybe(jsonRequest.end_date, (date) => new Date(date)),
  };
}

function deserializeResponse(jsonResponse: GetShipmentsJSONResponse) {
  return (jsonResponse.data.results || []).map((result) => ({
    ...toCamelCase(result),
  }));
}
