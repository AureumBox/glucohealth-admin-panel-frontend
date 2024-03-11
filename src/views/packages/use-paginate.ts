import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { Package } from "types/package";
import getPaginatedPackages from "services/packages/get-paginated-packages";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [packages, setPackages] = useState<Package[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchPackages = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedPackages({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setPackages(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return {
    packages,
    paginate,
    setPage,
    fetchPackages,
  };
}
