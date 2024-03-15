import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { Order } from "types/order";
import getPaginatedOrders from "services/orders/get-paginated-orders";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchOrders = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedOrders({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setOrders(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    paginate,
    setPage,
    fetchOrders,
  };
}
