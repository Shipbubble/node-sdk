import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';
import { toSnakeCase } from '../../utils/toSnakeCase';

type OperationId = 'requestShippingRatesForSelectedCouriers';

type ServiceTypes = 'pickup' | 'dropoff';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = BodyParams & PathParams;

// TODO: Some keys are missing in the documentation from postmen (service_type and delivery_instructions)
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface RequestShippingRatesFromCouriersRequest
  extends Camelize<
    Required<Omit<RequestParams, 'pickup_date' | 'delivery_instructions' | 'service_codes' | 'box_size_id'>>
  > {
  pickupDate: Date;
  serviceType?: ServiceTypes;
  deliveryInstructions?: string;
  serviceCodes: string[];
}

export type RequestShippingRatesFromCouriersJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestShippingRatesFromCouriersJSONResponse = SuccessResponse;

export type RequestShippingRatesFromCouriersResponse = ReturnType<typeof deserializeResponse>;

export interface RequestShippingRatesFromCouriersResponseAdapter
  extends ResponseAdapter<RequestShippingRatesFromCouriersResponse, RequestShippingRatesFromCouriersJSONResponse> {}

export const requestShippingRatesFromCouriersOperation: Operation<
  RequestShippingRatesFromCouriersRequest,
  RequestShippingRatesFromCouriersJSONRequest,
  RequestShippingRatesFromCouriersResponse,
  RequestShippingRatesFromCouriersJSONResponse
> = {
  method: 'POST',
  name: 'requestShippingRatesForSelectedCouriers',
  urlPathPattern: '/shipping/fetch_rates/{service_codes}',
  bodyParamNames: [
    'category_id',
    'delivery_instructions',
    'package_dimension',
    'package_items',
    'pickup_date',
    'reciever_address_code',
    'sender_address_code',
  ],
  urlPathParamNames: ['service_codes'],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: RequestShippingRatesFromCouriersRequest) {
  return {
    service_codes: request.serviceCodes.join(','),
  };
}

function getRequestBody(request: RequestShippingRatesFromCouriersRequest) {
  return {
    sender_address_code: request.senderAddressCode,
    reciever_address_code: request.recieverAddressCode,
    package_dimension: request.packageDimension,
    package_items: toSnakeCase(request.packageItems),
    category_id: request.categoryId,
    pickup_date: request.pickupDate.toISOString().split('T')[0],
    service_codes: request.serviceCodes.join(','),
    delivery_instructions: request.deliveryInstructions,
  };
}

function serializeRequest(request: RequestShippingRatesFromCouriersRequest) {
  return {
    sender_address_code: request.senderAddressCode,
    reciever_address_code: request.recieverAddressCode,
    package_dimension: request.packageDimension,
    package_items: request.packageItems,
    category_id: request.categoryId,
    pickup_date: request.pickupDate.toISOString().split('T')[0],
    service_codes: request.serviceCodes.join(','),
    delivery_instructions: request.deliveryInstructions,
  };
}

function deserializeRequest(
  jsonRequest: RequestShippingRatesFromCouriersJSONRequest,
): RequestShippingRatesFromCouriersRequest {
  return {
    ...toCamelCase(jsonRequest),
    pickupDate: new Date(jsonRequest.pickup_date),
    serviceCodes: jsonRequest.service_codes.split(','),
  };
}

function deserializeResponse(jsonResponse: RequestShippingRatesFromCouriersJSONResponse) {
  return {
    ...toCamelCase(jsonResponse.data),
    couriers: jsonResponse.data.couriers.map((courier) => ({
      ...toCamelCase(courier),
      // deliveryEtaTime: new Date(courier.delivery_eta_time),
      //   TODO: pickup_eta_time is not in the documentation
      //   pickupEtaTime: new Date(courier.pickup_eta_time),
    })),
    cheapestCourier: {
      ...toCamelCase(jsonResponse.data.cheapest_courier),
      // deliveryEtaTime: new Date(jsonResponse.data.cheapest_courier.delivery_eta_time),
    },
    checkoutData: {
      ...toCamelCase(jsonResponse.data.checkout_data),
      pickupTime: new Date(jsonResponse.data.checkout_data.pickup_time),
    },
  };
}
