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
import createMedicament, {
  MedicamentPayload,
} from "services/medicaments/create-medicament";

const CreateMedicament: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: MedicamentPayload & {
        submit: string | null;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        console.log('l')
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const payload: MedicamentPayload = {
          tradeName: values.tradeName,
          genericName: values.genericName,
          description: values.description,
          sideEffects: values.sideEffects,
          presentations: values.presentations,
        };
        console.log(payload);
        await createMedicament(payload);
        navigate("/medicaments");
        dispatch(
          setSuccessMessage(`Medicamento ${values.tradeName ? values.tradeName : values.genericName } creado correctamente`)
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
          Medicamentos
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          id: "",
          tradeName: "",
          genericName: "",
          description: "",
          sideEffects: [],
          presentations: [],
          submit: null,
        }}
        title={"Crear medicamento"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateMedicament)`
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
