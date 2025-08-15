export interface PageResponse<T> {
  data: T[];
  total: number;
}
export interface PageRequest {
  pageIndex: number;
  pageSize: number;
}
