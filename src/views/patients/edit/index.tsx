import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router";
//own
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "../../../store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import Form, { FormValues } from "../form";
import usePatientById from "./use-patient-by-dni";
import usePatientId from "./use-patient-by-id";
import { FormikHelpers } from "formik";
import editPatient, { PatientPayload } from "services/patients/edit-patient";
import createImc, { ImcPayload } from "services/patients/create-imc";

interface Patient extends PatientPayload {
  agreeToTerms: boolean;
}

const EditPatient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patientId = usePatientId();
  const patient = usePatientById(patientId);

  const onSubmit = useCallback(
    async (
      values: Patient & {
        submit: null | string;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);

        const oldValues = patient;

        await editPatient(patientId!, values);
        
        // Verificar si oldValues no es null y si las propiedades height y weight existen
        if (oldValues) {
            // Comparar altura y peso
            const heightChanged = oldValues.heightInCm !== values.heightInCm;
            const weightChanged = oldValues.weightInKg !== values.weightInKg;
            if (heightChanged || weightChanged) {
              // Calcular y guardar el IMC        
              const imcPayload: ImcPayload = {
                patientId: Number(patientId), // Asumiendo que el ID del paciente es el nationalId          ,
                date: new Date()
                  .toISOString()
                  .replace("T", " ") // Reemplaza 'T' por espacio
                  .split(".")[0], // Remueve milisegundos
                weightInKg: Number(values.weightInKg ?? 0),
                heightInCm: Number(values.heightInCm ?? 0),
              };
              console.log("pepe,", imcPayload);
              await createImc(imcPayload);
            }
        }        

        navigate("/patients");
        dispatch(
          setSuccessMessage(
            `Paciente ${values.fullName} editado correctamente`
          )
        );
      } catch (error) {
        if (error instanceof BackendError) {
          setErrors({
            ...error.getFieldErrorsMessages(),
            submit: error.getMessage(),
          });
          dispatch(setErrorMessage(error.getMessage()));
        }
        setStatus({ success: "false" });
      } finally {
        dispatch(setIsLoading(false));
        setSubmitting(false);
      }
    },
    [patientId, navigate, dispatch, patient]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Pacientes
        </Typography>
      </MainCard>
      {patient && (
        <Form
          isUpdate={true}
          initialValues={{
            ...patient,
            submit: null,
            agreeToTerms: false, // Añadir este campo
          }}
          title={"Editar paciente"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditPatient)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;
