import { useCallback, useEffect, useState } from "react";
// Own
import { Employee } from "core/employees/types";
import getPaginate from "services/employees/get-paginate";
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchEmployees = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate(
        { page, size: paginate.itemsPerPage },
        { onlyForAgencyRif: null }
      );
      setEmployees(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, paginate, setPage, fetchEmployees };
}
