export interface IBackendError {
  message: string;
  details?: BackendErrorItem[];
}

export interface BackendErrorItem {
  field: string;
  message: string;
}

export interface PaginateData {
  itemCount: number;
  pageIndex: number;
  itemsPerPage: number;
  pageCount: number;
}

export interface PaginatedResponse<T> {
  paginate: PaginateData;
  items: T[];
}

export interface BackendResponse<T> {
  status: number;
  data: T;
}

export interface BackendPaginatedResponse<T>
  extends BackendResponse<PaginateData & { items: T[] }> {}

export type PaginateBody = {
  page?: number;
  "per-page"?: number;
};
