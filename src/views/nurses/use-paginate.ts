import { useCallback, useEffect, useState } from "react";
// Own
import { Nurse } from "types/nurse";
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import getPaginatedNurses from "services/nurses/get-paginated-nurses";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchNurses = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedNurses({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setNurses(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchNurses();
  }, [fetchNurses]);

  return {
    nurses,
    paginate,
    setPage,
    fetchNurses,
  };
}
