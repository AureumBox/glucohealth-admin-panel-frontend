import { SelectOption } from "components/SelectField";
import BackendError from "exceptions/backend-error";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { setErrorMessage, setIsLoading } from "store/customizationSlice";
import getAllEmployees, { Body } from "services/staff/get-all-employees";
import { Employee } from "types/employee";

export default function useEmployeesOptions(body: Body): SelectOption[] {
  const [items, setItems] = useState<Employee[]>([]);
  const dispatch = useAppDispatch();

  const fetchItems = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getAllEmployees({
        onlyForAgencyRif: body.onlyForAgencyRif,
        employeeDni: body.employeeDni,
      });
      setItems(response);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, body.onlyForAgencyRif, body.employeeDni]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return items.map((item) => ({
    label: `${item.firstName} ${item.lastName}`,
    value: item.id,
  }));
}
