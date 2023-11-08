import { Operation, ResponseAdapter } from '../../core';
import { operations } from '../../types/api';
import { Camelize, toCamelCase } from '../../utils';

type OperationId = 'updateRequestTokenDetails';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

export interface EditTokenDetailsRequest extends Camelize<Required<RequestParams>> {}

export type EditTokenDetailsJSONRequest = ReturnType<typeof serializeRequest>;

export type EditTokenDetailsJSONResponse = SuccessResponse;

export type EditTokenDetailsResponse = ReturnType<typeof deserializeResponse>;

export interface EditTokenDetailsResponseAdapter
  extends ResponseAdapter<EditTokenDetailsResponse, EditTokenDetailsJSONResponse> {}

export const editRequestTokenOperation: Operation<
  EditTokenDetailsRequest,
  EditTokenDetailsJSONRequest,
  EditTokenDetailsResponse,
  EditTokenDetailsJSONResponse
> = {
  method: 'PATCH',
  name: 'updateRequestTokenDetails',
  urlPathPattern: '/shipping/fetch_rates/request_token',
  bodyParamNames: ['reciever_name', 'reciever_phone', 'sender_name', 'sender_phone', 'request_token'],
  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

function getRequestUrlParams(request: EditTokenDetailsRequest) {
  return {};
}

function getRequestBody(request: EditTokenDetailsRequest) {
  return {
    reciever_name: request.recieverName,
    reciever_phone: request.recieverPhone,
    sender_name: request.senderName,
    sender_phone: request.senderPhone,
    request_token: request.requestToken,
  };
}

function serializeRequest(request: EditTokenDetailsRequest) {
  return {
    reciever_name: request.recieverName,
    reciever_phone: request.recieverPhone,
    sender_name: request.senderName,
    sender_phone: request.senderPhone,
    request_token: request.requestToken,
  };
}

function deserializeRequest(jsonRequest: EditTokenDetailsJSONRequest) {
  return toCamelCase(jsonRequest);
}

function deserializeResponse(jsonResponse: EditTokenDetailsJSONResponse) {
  return true;
}
