import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import getPatient from "services/patients/get-patient";
import { Patient } from "types/patient";

export default function usePatientById(patientId: string | null) {
  const dispatch = useAppDispatch();
  const [patient, setPatient] = useState<Patient | null>(null);

  const fetchPatient = useCallback(
    async (patientId: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getPatient(patientId);
        console.log(response);
        setPatient(response);
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
    if (patientId) fetchPatient(patientId);
  }, [fetchPatient, patientId]);

  return patient;
}
