import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'getInsuranceRates';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface GetInsuranceRatesRequest extends Camelize<Required<RequestParams>> {}

// export interface GetInsuranceRatesRequest extends Camelize<Omit<RequestParams, 'request_token'>> {
//   requestToken: string;
// }

export type GetInsuranceRatesJSONResponse = SuccessResponse;

export type GetInsuranceRatesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetInsuranceRatesResponse = ReturnType<typeof deserializeResponse>;

export interface GetInsuranceRatesResponseAdapter
  extends ResponseAdapter<GetInsuranceRatesResponse, GetInsuranceRatesJSONResponse> {}

export const getInsuranceRatesOperation: Operation<
  GetInsuranceRatesRequest,
  GetInsuranceRatesJSONRequest,
  GetInsuranceRatesResponse,
  GetInsuranceRatesJSONResponse
> = {
  method: 'GET',
  name: 'getInsuranceRates',
  urlPathPattern: '/shipping/insurance_rates',
  urlSearchParamNames: ['request_token'],
  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: GetInsuranceRatesRequest) {
  return {
    request_token: request.requestToken,
  };
}

function serializeRequest(request: GetInsuranceRatesRequest) {
  return {
    request_token: request.requestToken,
  };
}

function deserializeRequest(jsonRequest: GetInsuranceRatesJSONRequest): GetInsuranceRatesRequest {
  return {
    requestToken: jsonRequest.request_token,
  };
}

function deserializeResponse(jsonResponse: GetInsuranceRatesJSONResponse) {
  return toCamelCase(jsonResponse.data);
}
