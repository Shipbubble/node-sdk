import { Config, RequestController } from '..';
import { OperationRequestValidator } from '../operations/OperationRequestValidator';
import { Operation, OperationRequestBody } from '../operations/Operation';
import { ResponseAdapter } from '../operations/response';
import { OperationRequestBuilder } from './OperationRequestBuilder';

export class OperationResolver<Request, JSONRequest, Response, JSONResponse> {
  private readonly requestValidator = new OperationRequestValidator(this.operation);
  private readonly requestBuilder = new OperationRequestBuilder(this.operation, this.config);
  private readonly requestController = new RequestController();

  public constructor(
    private readonly operation: Operation<Request, JSONRequest, Response, JSONResponse>,
    private readonly baseUrl: string,
    private readonly config: Config,
  ) {}

  public readonly fetch = async (request: Request): Promise<ResponseAdapter<Response, JSONResponse>> => {
    this.requestValidator.validate(request);

    const { url, urlSearchParams } = this.requestBuilder.prepareUrl(this.baseUrl, request);
    const body = this.requestBuilder.prepareBody(request);

    const jsonResponse: JSONResponse = await this.requestController.request<OperationRequestBody | null, JSONResponse>({
      method: this.operation.method,
      url,
      params: urlSearchParams,
      headers: this.requestBuilder.prepareHeaders(),
      data: body,
    });

    return new ResponseAdapter(jsonResponse, () => this.operation.deserializeResponse(jsonResponse, request));
  };
}
