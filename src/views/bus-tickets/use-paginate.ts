import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { BusTicket } from "types/bus-ticket";
import getPaginatedBusTickets from "services/bus-tickets/get-paginated-bus-tickets";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [busTickets, setBusTickets] = useState<BusTicket[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchBusTickets = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedBusTickets({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setBusTickets(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchBusTickets();
  }, [fetchBusTickets]);

  return {
    busTickets,
    paginate,
    setPage,
    fetchBusTickets,
  };
}
