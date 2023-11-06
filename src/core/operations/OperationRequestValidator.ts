import { ErrorCode, SBError } from '../Error';
import { Operation } from './';

export class OperationRequestValidator<Request, JSONRequest> {
  private readonly allParamNames: (keyof Request | keyof JSONRequest)[];

  public constructor(operation: Operation<Request, JSONRequest, unknown, unknown>) {
    this.allParamNames = [
      ...(operation.urlPathParamNames || []),
      ...(operation.urlSearchParamNames || []),
      ...(operation.bodyParamNames || []),
    ];
  }

  public validate(request: JSONRequest) {
    const requestParamNames = Object.keys(request as Record<string, unknown>);

    for (const paramName of requestParamNames) {
      if (!this.allParamNames.includes(paramName as keyof Request & keyof JSONRequest)) {
        const allParamsNames = this.allParamNames.join(', ');
        throw new SBError({
          code: ErrorCode.INVALID_ARGUMENT,
          message: `Request contains unknown parameter: ${paramName}. This operation supports the following parameters: ${allParamsNames}`,
        });
      }
    }
  }
}
