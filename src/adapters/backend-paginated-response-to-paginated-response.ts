import { BackendPaginatedResponse, PaginatedResponse } from "services/types";

export function backendPaginatedResponseToPaginatedResponse<T>({
  data,
}: BackendPaginatedResponse<T>): PaginatedResponse<T> {
  return {
    paginate: {
      itemCount: data.itemCount,
      pageIndex: data.pageIndex,
      itemsPerPage: data.itemsPerPage,
      pageCount: data.pageCount,
    },
    items: data.items,
  };
}
