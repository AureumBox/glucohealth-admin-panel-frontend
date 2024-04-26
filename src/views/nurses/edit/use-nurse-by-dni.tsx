import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import getNurse from "services/nurses/get-nurse";
import { Nurse } from "types/nurse";

export default function useNurseById(nurseId: string | null) {
  const dispatch = useAppDispatch();
  const [nurse, setNurse] = useState<Nurse | null>(null);

  const fetchNurse = useCallback(
    async (nurseId: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getNurse(nurseId);
        console.log(response);
        setNurse(response);
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
    if (nurseId) fetchNurse(nurseId);
  }, [fetchNurse, nurseId]);

  return nurse;
}
