import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'requestShippingRates';

type ServiceTypes = 'pickup' | 'dropoff';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

// TODO: Some keys are missing in the documentation from postmen (service_type and delivery_instructions)
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface RequestShippingRatesRequest
  extends Camelize<Required<Omit<RequestParams, 'pickup_date' | 'delivery_instructions'>>> {
  pickupDate: Date;
  serviceType?: ServiceTypes;
  deliveryInstructions?: string;
}

export type RequestShippingRatesJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestShippingRatesJSONResponse = SuccessResponse;

export type RequestShippingRatesResponse = ReturnType<typeof deserializeResponse>;

export interface RequestShippingRatesResponseAdapter
  extends ResponseAdapter<RequestShippingRatesResponse, RequestShippingRatesJSONResponse> {}

export const requestShippingRatesOperation: Operation<
  RequestShippingRatesRequest,
  RequestShippingRatesJSONRequest,
  RequestShippingRatesResponse,
  RequestShippingRatesJSONResponse
> = {
  method: 'POST',
  name: 'requestShippingRates',
  urlPathPattern: '/shipping/fetch_rates',
  bodyParamNames: [
    'category_id',
    'delivery_instructions',
    'package_dimension',
    'package_items',
    'pickup_date',
    'reciever_address_code',
    'sender_address_code',
  ],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: RequestShippingRatesRequest) {
  return {
    sender_address_code: request.senderAddressCode,
    reciever_address_code: request.recieverAddressCode,
    package_dimension: request.packageDimension,
    package_items: request.packageItems,
    category_id: request.categoryId,
    pickup_date: request.pickupDate.toISOString(),
    delivery_instructions: request.deliveryInstructions,
  };
}

function serializeRequest(request: RequestShippingRatesRequest) {
  return {
    sender_address_code: request.senderAddressCode,
    reciever_address_code: request.recieverAddressCode,
    package_dimension: request.packageDimension,
    package_items: request.packageItems,
    category_id: request.categoryId,
    pickup_date: request.pickupDate.toISOString(),
    delivery_instructions: request.deliveryInstructions,
  };
}

function deserializeRequest(jsonRequest: RequestShippingRatesJSONRequest): RequestShippingRatesRequest {
  return {
    ...toCamelCase(jsonRequest),
    pickupDate: new Date(jsonRequest.pickup_date),
  };
}

function deserializeResponse(jsonResponse: RequestShippingRatesJSONResponse) {
  return {
    ...toCamelCase(jsonResponse.data),
    couriers: jsonResponse.data.couriers.map((courier) => ({
      ...toCamelCase(courier),
      deliveryEtaTime: new Date(courier.delivery_eta_time),
      //   TODO: pickup_eta_time is not in the documentation
      //   pickupEtaTime: new Date(courier.pickup_eta_time),
    })),
    fastestCourier: {
      ...toCamelCase(jsonResponse.data.fastest_courier),
      deliveryEtaTime: new Date(jsonResponse.data.fastest_courier.delivery_eta_time),
      //   TODO: pickup_eta_time is not in the documentation
    },
    cheapestCourier: {
      ...toCamelCase(jsonResponse.data.cheapest_courier),
      deliveryEtaTime: new Date(jsonResponse.data.cheapest_courier.delivery_eta_time),
    },
    checkoutData: {
      ...toCamelCase(jsonResponse.data.checkout_data),
      pickupTime: new Date(jsonResponse.data.checkout_data.pickup_time),
    },
  };
}
