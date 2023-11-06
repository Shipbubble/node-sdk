// TODO: Needs docs update
// import { Operation, ResponseAdapter } from '../../core';
// import { operations } from '../../types/api';
// import { Camelize, toCamelCase } from '../../utils';

// type OperationId = 'getRatesForAReturnShipmentRequest';

// type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
// type PathParams = operations[OperationId]['parameters']['path'];
// type RequestParams = BodyParams & PathParams;

// type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// export interface GetRatesForReturnShipmentRequest extends Camelize<Required<RequestParams>> {
//   courierId: string;
//   insuranceCode?: string;
// }

// export type GetRatesForReturnShipmentJSONRequest = ReturnType<typeof serializeRequest>;

// export type GetRatesForReturnShipmentJSONResponse = SuccessResponse;

// export type GetRatesForReturnShipmentResponse = ReturnType<typeof deserializeResponse>;

// export interface GetRatesForReturnShipmentResponseAdapter
//   extends ResponseAdapter<GetRatesForReturnShipmentResponse, GetRatesForReturnShipmentJSONResponse> {}

// export const getRatesForReturnShipmentOperation: Operation<
//   GetRatesForReturnShipmentRequest,
//   GetRatesForReturnShipmentJSONRequest,
//   GetRatesForReturnShipmentResponse,
//   GetRatesForReturnShipmentJSONResponse
// > = {
//   method: 'POST',
//   name: 'getRatesForAReturnShipmentRequest',
//   urlPathPattern: '/shipping/labels',
//   bodyParamNames: ['courier_id', 'insurance_code', 'request_token', 'service_code'],
//   getRequestUrlParams,
//   getRequestBody,
//   deserializeResponse,
//   serializeRequest,
//   deserializeRequest,
// };

// function getRequestUrlParams() {
//   return {};
// }

// function getRequestBody(request: GetRatesForReturnShipmentRequest) {
//   return {
//     request_token: request.requestToken,
//     service_code: request.serviceCode,
//     courier_id: request.courierId,
//     insurance_code: request.insuranceCode,
//   };
// }

// function serializeRequest(request: GetRatesForReturnShipmentRequest) {
//   return {
//     request_token: request.requestToken,
//     service_code: request.serviceCode,
//     courier_id: request.courierId,
//     insurance_code: request.insuranceCode,
//   };
// }

// function deserializeRequest(jsonRequest: GetRatesForReturnShipmentJSONRequest) {
//   return toCamelCase(jsonRequest);
// }

// function deserializeResponse(jsonResponse: GetRatesForReturnShipmentJSONResponse) {
//   return toCamelCase(jsonResponse.data);
// }
