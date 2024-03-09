import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { HotelPerNight } from "types/hotel-per-night";
import getPaginatedHotelsPerNight from "services/hotels-per-night/get-paginated-hotel-per-night";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [hotelsPerNight, setHotelsPerNight] = useState<HotelPerNight[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchHotelsPerNight = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedHotelsPerNight({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setHotelsPerNight(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchHotelsPerNight();
  }, [fetchHotelsPerNight]);

  return {
    hotelsPerNight,
    paginate,
    setPage,
    fetchHotelsPerNight,
  };
}
