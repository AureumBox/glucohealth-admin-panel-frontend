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
import useMedicamentById from "./use-medicament-by-dni";
import useMedicamentId from "./use-medicament-by-id";
import { FormikHelpers } from "formik";
import editMedicament, { MedicamentPayload } from "services/medicaments/edit-medicament";

const EditMedicament: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const medicamentId = useMedicamentId();
  const medicament = useMedicamentById(medicamentId);

  const onSubmit = useCallback(
    async (
      values: MedicamentPayload & {
        submit: null | string;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await editMedicament(medicamentId!, values);
        navigate("/medicaments");
        dispatch(
          setSuccessMessage(
            `Enfermero ${values.tradeName ? values.tradeName : values.genericName} editado correctamente`
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
    [medicamentId, navigate, dispatch, medicament]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Medicamentos
        </Typography>
      </MainCard>
      {medicament && (
        <Form
          isUpdate={true}
          initialValues={{
            ...medicament,
            submit: null,
          }}
          title={"Editar enfermero"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditMedicament)`
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
