import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import createCustomer, {
  CustomerPayload,
} from "services/customers/create-customer";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";
import { Customer } from "core/customers/types";

const CreateClient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: Customer & { submit: string | null },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const payload: CustomerPayload = {
          dni: values.dni,
          firstName: values.firstName,
          lastName: values.lastName,
          birthdate: values.birthdate,
          email: values.email,
          address: values.address,
          citizenship: values.citizenship,
          phoneNumber: values.phoneNumber,
        };
        console.log(payload);
        await createCustomer(payload);
        navigate("/clients");
        dispatch(
          setSuccessMessage(`Cliente ${values.firstName} creado correctamente`)
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
          Clientes
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          dni: "",
          birthdate: new Date(),
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          id: "",
          citizenship: "",
          phoneNumber: "",
          submit: null,
        }}
        title={"Crear cliente"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateClient)`
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
