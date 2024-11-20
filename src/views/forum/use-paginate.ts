import { useCallback, useEffect, useState } from "react";
// Own
import { Medicament } from "types/medicament";
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import getPaginatedMedicaments from "services/medicaments/get-paginated-medicaments";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchMedicaments = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedMedicaments({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setMedicaments(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchMedicaments();
  }, [fetchMedicaments]);

  return {
    medicaments,
    paginate,
    setPage,
    fetchMedicaments,
  };
}
