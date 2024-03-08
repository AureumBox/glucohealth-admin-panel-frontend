import { SelectOption } from "components/SelectField";
import { Customer } from "core/customers/types";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import getAllCustomers from "services/customers/get-all-customers";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";

export default function useCustomersOptions(): SelectOption[] {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const dispatch = useAppDispatch();

  const fetchCustomers = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllCustomers();
      setCustomers(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return customers.map((c) => ({
    label: `${c.firstName} ${c.lastName}`,
    value: c.id,
  }));
}
