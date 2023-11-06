export interface Operation<Request, JSONRequest, Response, JSONResponse> {
  name: string;
  method: OperationRequestMethod;
  urlPathPattern: string;
  urlPathParamNames?: (keyof JSONRequest)[];
  urlSearchParamNames?: (keyof JSONRequest)[];
  bodyParamNames?: (keyof JSONRequest)[];
  firstPageIndex?: number;

  getRequestUrlParams(request: Request): OperationRequestUrlParams;
  getRequestBody?(request: Request): OperationRequestBody;
  deserializeResponse(jsonResponse: JSONResponse, request: Request): Response;
  serializeRequest(request: Request): JSONRequest;
  deserializeRequest(jsonRequest: JSONRequest): Request;
}

export type OperationRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type OperationRequestUrlParams = Record<string, string | string[] | boolean | undefined>;
export type OperationRequestBody = Record<string, unknown>;
