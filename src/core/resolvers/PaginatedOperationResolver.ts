import { OperationRequestBuilder } from './OperationRequestBuilder';
import { RequestController } from '../controllers/RequestController';
import {
  PaginatedRequest,
  OperationRequestValidator,
  PaginatedOperation,
  PaginatedResponseAdapter,
  PaginatedJSONResponse,
} from '../operations';
import { NextPaginatedRequestResolver } from '../operations/request';
import { PaginationReader } from '../operations/response/PaginationReader';
import { Config } from '../config';

export class PaginatedOperationResolver<Request extends PaginatedRequest, JSONRequest, Result, JSONResult> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.config);
  private readonly requestController = RequestController.create();

  public constructor(
    private readonly operation: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
    private readonly baseUrl: string,
    private readonly config: Config,
  ) {
    if (operation.firstPageIndex !== 0 && operation.firstPageIndex !== 1) {
      throw new Error(`Operation ${operation.name} has invalid value for firstPageIndex property`);
    }
  }

  public readonly fetch = async (request: Request): Promise<PaginatedResponseAdapter<Result, JSONResult>> => {
    this.requestValidator.validate(request);

    const { url, urlSearchParams } = this.requestBuilder.prepareUrl(this.baseUrl, request);
    const body = this.requestBuilder.prepareBody(request);

    const jsonResponse: PaginatedJSONResponse<JSONResult> = await this.requestController.request({
      method: this.operation.method,
      url,
      params: urlSearchParams,
      headers: this.requestBuilder.prepareHeaders(),
      data: body,
    });

    const pagination = PaginationReader.read(jsonResponse);
    const nextRequest = NextPaginatedRequestResolver.resolve(this.operation, request, pagination);

    return new PaginatedResponseAdapter<Result, JSONResult>(
      pagination,
      jsonResponse,
      () => this.operation.deserializeResponse(jsonResponse, request),
      nextRequest ? () => this.fetch(nextRequest) : undefined,
    );
  };
}
