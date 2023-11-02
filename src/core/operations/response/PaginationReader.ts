import { PaginatedJSONResponse } from '../PaginatedOperation';
import { Pagination } from './Pagination';

export class PaginationReader {
  public static read(jsonResponse: PaginatedJSONResponse<unknown>): Pagination {
    return {
      current: jsonResponse.data.pagination.current,
      perPage: jsonResponse.data.pagination.perPage,
      total: jsonResponse.data.pagination.total,
      previous: jsonResponse.data.pagination.previous,
      next: jsonResponse.data.pagination.next,
    };
  }
}
