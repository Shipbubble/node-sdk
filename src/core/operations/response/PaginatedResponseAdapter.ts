import { ErrorCode, SBError } from '../../Error';
import { PaginatedJSONResponse } from '../PaginatedOperation';
import { Pagination } from './Pagination';

export class PaginatedResponseAdapter<Result, JSONResult> {
  public constructor(
    public readonly pagination: Pagination,
    private readonly jsonResponse: PaginatedJSONResponse<JSONResult>,
    private readonly getResult: () => Result,
    private readonly nextHandler: (() => Promise<PaginatedResponseAdapter<Result, JSONResult>>) | undefined,
  ) {}

  public get result(): Result {
    return this.getResult();
  }

  public get raw(): JSONResult {
    return this.jsonResponse as JSONResult;
  }

  public toJSON(): JSONResult {
    return this.jsonResponse as JSONResult;
  }

  public readonly hasNext = () => !!this.nextHandler;

  public next: () => Promise<PaginatedResponseAdapter<Result, JSONResult>> = () => {
    if (!this.nextHandler) {
      throw new SBError({
        code: ErrorCode.NO_DATA_FOUND,
        message:
          'Page limit exceeded! Before calling this method check an existence of the next page by .hasNext() method.',
      });
    }
    return this.nextHandler();
  };
}
