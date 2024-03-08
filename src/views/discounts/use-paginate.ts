import { useCallback, useEffect, useState } from "react";
// Own
import { useAppDispatch } from "store";
import { PaginateData } from "services/types";
import { Discount } from "core/discounts/types";
import BackendError from "exceptions/backend-error";
import getPaginate from "services/discounts/get-paginate";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchDiscounts = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({ page, "per-page": paginate.itemsPerPage });
      setDiscounts(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return { discounts, paginate, setPage, fetchDiscounts };
}
