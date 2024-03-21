import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { Tour } from "types/tour";
import getPaginatedTours from "services/tours/get-paginated-tours";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [tours, setTrainTickets] = useState<Tour[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchTours = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedTours({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setTrainTickets(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  return {
    tours,
    paginate,
    setPage,
    fetchTours,
  };
}
