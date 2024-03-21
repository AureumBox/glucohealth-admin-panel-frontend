import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { CarRental } from "types/car-rental";
import getPaginatedCarRentals from "services/car-rentals/get-paginated-car-rentals";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [carRentals, setCarRentals] = useState<CarRental[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchCarRentals = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedCarRentals({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setCarRentals(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchCarRentals();
  }, [fetchCarRentals]);

  return {
    carRentals,
    paginate,
    setPage,
    fetchCarRentals,
  };
}
