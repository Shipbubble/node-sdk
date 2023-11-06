import { PaginatedOperation, PaginatedRequest } from '../PaginatedOperation';
import { Pagination } from '../response/Pagination';

export class NextPaginatedRequestResolver {
  public static resolve<Request extends PaginatedRequest, JSONRequest>(
    operation: PaginatedOperation<Request, JSONRequest, unknown, unknown>,
    request: Request,
    pagination: Pagination,
  ): Request | null {
    const currentPage = operation.firstPageIndex === 1 ? pagination.current : pagination.current + 1;
    const hasNextPage = pagination.next > 0;
    if (!hasNextPage) {
      return null;
    }

    const nextParams = { ...request };
    // if (pagination.cursor) {
    //   nextParams.cursor = pagination.cursor;
    // } else {
    //   nextParams.offset = (pagination.page + 1) * (nextParams.limit || 500);
    // }
    nextParams.Page = currentPage + 1;
    return nextParams;
  }
}
