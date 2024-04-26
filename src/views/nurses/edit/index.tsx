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
import useNurseById from "./use-nurse-by-dni";
import useNurseId from "./use-nurse-by-id";
import { FormikHelpers } from "formik";
import editNurse, { NursePayload } from "services/nurses/edit-nurse";

const EditNurse: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nurseId = useNurseId();
  const nurse = useNurseById(nurseId);

  const onSubmit = useCallback(
    async (
      values: NursePayload & {
        submit: null | string;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        await editNurse(nurseId!, values);
        navigate("/nurses");
        dispatch(
          setSuccessMessage(
            `Enfermero ${values.fullName} editado correctamente`
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
    [nurseId, navigate, dispatch, nurse]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Enfermeros
        </Typography>
      </MainCard>
      {nurse && (
        <Form
          isUpdate={true}
          initialValues={{
            ...nurse,
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

export default styled(EditNurse)`
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
