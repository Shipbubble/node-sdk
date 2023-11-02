export interface Pagination {
  total?: number;
  current?: number;
  perPage?: number;
  previous?: number;
  next?: number;
  err?: string;
}
