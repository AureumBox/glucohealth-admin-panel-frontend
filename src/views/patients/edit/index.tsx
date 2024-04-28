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

const EditPatient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const patientId = usePatientId();
  const patient = usePatientById(patientId);

  const onSubmit = useCallback(
    async (
      values: PatientPayload & {
        submit: null | string;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await editPatient(patientId!, values);
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
