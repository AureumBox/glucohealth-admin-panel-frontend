import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import getMedicament from "services/medicaments/get-medicament";
import { Medicament } from "types/medicament";

export default function useMedicamentById(medicamentId: string | null) {
  const dispatch = useAppDispatch();
  const [medicament, setMedicament] = useState<Medicament | null>(null);

  const fetchMedicament = useCallback(
    async (medicamentId: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getMedicament(medicamentId);
        console.log(response);
        setMedicament(response);
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
    if (medicamentId) fetchMedicament(medicamentId);
  }, [fetchMedicament, medicamentId]);

  return medicament;
}
