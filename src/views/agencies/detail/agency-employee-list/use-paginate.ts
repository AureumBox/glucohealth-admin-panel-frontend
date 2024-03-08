// material-ui

import { useEffect, useState, useCallback } from 'react';
import getPaginate from 'services/employees/get-paginate';
import { Employee } from 'core/employees/types';
import { PaginateData } from 'services/types';
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading } from 'store/customizationSlice';

export default function usePaginate(onlyForAgencyRif: string | null) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchStates = useCallback(async (page?: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({
        page: page || 1,
        size: paginate.itemsPerPage,
      }, {
        onlyForAgencyRif,
      });
      setItems(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, paginate.itemsPerPage, onlyForAgencyRif]);

  useEffect(() => {
    fetchStates(page);
  }, [fetchStates, page]);

  return { items, page, paginate, setPage, fetchStates } as const;
}
