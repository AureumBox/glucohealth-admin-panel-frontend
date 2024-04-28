import { useCallback, useEffect, useState } from "react";
// Own
import { Patient } from "types/patient";
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import getPaginatedPatients from "services/patients/get-paginated-patients";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchPatients = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedPatients({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setPatients(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    paginate,
    setPage,
    fetchPatients,
  };
}
