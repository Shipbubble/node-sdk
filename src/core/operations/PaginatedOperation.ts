import { Operation } from './';
import { Pagination } from './response';

export interface PaginatedRequest {
  Page?: number;
  PerPage?: number;
}

export interface PaginatedJSONResponse<JSONResult> {
  data: {
    pagination: Pagination;
    result: JSONResult;
  };
}

export interface PaginatedOperation<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>
  extends Operation<Request, JSONRequest, Response, PaginatedJSONResponse<JSONResult>> {
  // firstPageIndex: number;
}
