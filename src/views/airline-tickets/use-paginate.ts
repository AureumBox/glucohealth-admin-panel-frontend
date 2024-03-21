import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { AirlineTicket } from "types/airline-ticket";
import getPaginatedAirlineTickets from "services/airline-tickets/get-paginated-airline-tickets";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [airlineTickets, setAirlineTickets] = useState<AirlineTicket[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchAirlineTickets = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedAirlineTickets({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setAirlineTickets(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchAirlineTickets();
  }, [fetchAirlineTickets]);

  return {
    airlineTickets,
    paginate,
    setPage,
    fetchAirlineTickets,
  };
}
