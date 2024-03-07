import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'requestShippingRatesForSelectedCouriers';

type ServiceTypes = 'pickup' | 'dropoff';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = BodyParams & PathParams;

// TODO: Some keys are missing in the documentation from postmen (service_type and delivery_instructions)
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface RequestShippingRatesFromCouriersRequest
  extends Camelize<Required<Omit<RequestParams, 'pickup_date' | 'delivery_instructions' | 'service_codes'>>> {
  pickupDate: Date;
  serviceType?: ServiceTypes;
  deliveryInstructions?: string;
  // TODO: change from serviceCodes to orderId
  serviceCodes: string[];
}

export type RequestShippingRatesFromCouriersJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestShippingRatesFromCouriersJSONResponse = SuccessResponse;

export type RequestShippingRatesFromCouriersResponse = ReturnType<typeof deserializeResponse>;

export interface RequestShippingRatesFromCouriersResponseAdapter
  extends ResponseAdapter<RequestShippingRatesFromCouriersResponse, RequestShippingRatesFromCouriersJSONResponse> {}

export const getSpecificShipmentsOperation: Operation<
  RequestShippingRatesFromCouriersRequest,
  RequestShippingRatesFromCouriersJSONRequest,
  RequestShippingRatesFromCouriersResponse,
  RequestShippingRatesFromCouriersJSONResponse
> = {
  method: 'POST',
  name: 'requestShippingRatesForSelectedCouriers',
  urlPathPattern: '/shipping/fetch_rates/{serviceCodes}',
  bodyParamNames: [
    'categoryId',
    'deliveryInstructions',
    'packageDimension',
    'packageItems',
    'pickupDate',
    'recieverAddressCode',
    'senderAddressCode',
  ],
  urlPathParamNames: ['serviceCodes'],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: RequestShippingRatesFromCouriersRequest) {
  return {
    serviceCodes: request.serviceCodes.join(','),
  };
}

function getRequestBody(request: RequestShippingRatesFromCouriersRequest) {
  return {
    ...request,
    pickupDate: request.pickupDate.toISOString(),
  };
}

function serializeRequest(request: RequestShippingRatesFromCouriersRequest) {
  return {
    ...request,
    pickupDate: request.pickupDate.toISOString(),
    serviceCodes: request.serviceCodes.join(','),
  };
}

function deserializeRequest(
  jsonRequest: RequestShippingRatesFromCouriersJSONRequest,
): RequestShippingRatesFromCouriersRequest {
  return {
    ...jsonRequest,
    pickupDate: new Date(jsonRequest.pickupDate),
    serviceCodes: jsonRequest.serviceCodes.split(','),
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
