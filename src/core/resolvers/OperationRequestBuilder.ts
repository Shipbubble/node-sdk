import { Config, SBConfig } from '../config';
import { Operation, OperationRequestBody } from '../operations';

export class OperationRequestBuilder<Request, JSONRequest> {
  public constructor(
    private readonly operation: Operation<Request, JSONRequest, unknown, unknown>,
    private readonly config: Config,
  ) {}

  public prepareUrl(baseUrl: string, request: Request) {
    const urlParams = this.operation.getRequestUrlParams(request);

    let urlPath = this.operation.urlPathPattern;

    for (const paramName of this.operation.urlPathParamNames ?? []) {
      const paramValue = urlParams[paramName as string];
      if (!paramValue) {
        throw new Error(`Param ${paramName as string} is required`);
      }
      urlPath = urlPath.replace(`{${paramName as string}}`, paramValue as string);
    }
    const url = `${baseUrl}${urlPath}`;

    const urlSearchParams: Record<string, string | string[] | boolean> = {};
    Object.keys(urlParams)
      .filter((paramName) => !this.operation.urlPathParamNames?.includes(paramName as keyof JSONRequest))
      .forEach((paramName) => {
        const paramValue = urlParams[paramName];
        if (paramValue) {
          urlSearchParams[paramName] = paramValue;
        }
      });

    return { url, urlSearchParams };
  }

  public prepareBody(request: Request): OperationRequestBody | undefined {
    if (!this.operation.getRequestBody && !this.operation.bodyParamNames) {
      return undefined;
    }
    if (!this.operation.getRequestBody) {
      throw new Error(`getRequestBody is not implemented for operation ${this.operation.name}`);
    }
    if (!this.operation.bodyParamNames) {
      throw new Error(`bodyParamNames are empty for operation ${this.operation.name}`);
    }

    const body = this.operation.getRequestBody(request);

    return body;
  }

  public prepareHeaders(): Record<string, string> {
    const apiKey = this.config.get(SBConfig.apiKey);
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
  }
}
