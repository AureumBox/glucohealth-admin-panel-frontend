import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import getEmployee from "services/staff/get-employee";
import { Employee } from "types/employee";

export default function useEmployeeById(employeeId: string | null) {
  const dispatch = useAppDispatch();
  const [employee, setEmployee] = useState<Employee | null>(null);

  const fetchEmployee = useCallback(
    async (employeeId: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getEmployee(employeeId);
        console.log(response);
        setEmployee(response);
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
    if (employeeId) fetchEmployee(employeeId);
  }, [fetchEmployee, employeeId]);

  return employee;
}
