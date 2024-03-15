import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { Customer } from "types/customer";
import getCustomer from "services/customers/get-customer";

export default function useClientByDni(clientDni: string | null) {
  const dispatch = useAppDispatch();
  const [client, setClient] = useState<Customer | null>(null);

  const fetchClient = useCallback(
    async (id: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getCustomer(id);
        console.log(response)
        setClient(response);
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (clientDni) fetchClient(clientDni);
  }, [fetchClient, clientDni]);

  return client;
}
