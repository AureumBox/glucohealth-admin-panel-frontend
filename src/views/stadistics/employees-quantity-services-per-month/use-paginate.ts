import { useCallback, useEffect, useState } from "react";
// Own
import { useAppDispatch } from "store";
import { PaginateData } from "services/types";
import BackendError from "exceptions/backend-error";
import getBestSellingProducts from "services/stadistics/best-selling-products";
import { BestSellingProducts } from "services/stadistics/types";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [bestSellingProducts, setBestSellingProducts] = useState<BestSellingProducts[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchBestSellingProducts = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getBestSellingProducts({ page, size: paginate.itemsPerPage });
      setBestSellingProducts(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchBestSellingProducts();
  }, [fetchBestSellingProducts]);

  return { bestSellingProducts, paginate, setPage };
}
