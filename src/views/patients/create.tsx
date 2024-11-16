import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";
import createPatient, {
  PatientPayload,
} from "services/patients/create-patient";

const CreatePatient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: PatientPayload & {
        submit: string | null;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const payload: PatientPayload = {
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          nationalId: values.nationalId,
          birthdate: values.birthdate,
          weightInKg: values.weightInKg,
          heightInCm: values.heightInCm,
        };
        console.log(payload);
        await createPatient(payload);
        navigate("/patients");
        dispatch(
          setSuccessMessage(`Paciente ${values.fullName} creado correctamente`)
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
    [dispatch, navigate]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Pacientes
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          id: "",
          fullName: "",
          email: "",
          phoneNumber: "",
          nationalId: "",
          birthdate: null,
          weightInKg: null,
          heightInCm: null,
          submit: null,
          agreeToTerms: false,
        }}
        title={"Crear paciente"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreatePatient)`
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
