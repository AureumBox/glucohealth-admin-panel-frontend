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
import createPackage, {
  PackagePayload,
} from "services/packages/create-package";

const CreatePackage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: FormValues,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const payload: PackagePayload = {
          name: values.name,
          description: values.description,
          appliedDiscountPercentage: values.appliedDiscountPercentage,
          containedServices: values.containedServices.map((csId) => ({
            serviceId: csId,
            amountContained: values.servicesQuantities[csId] ?? 1,
          })),
        };
        console.log(payload);
        await createPackage(payload);
        navigate("/packages");
        dispatch(
          setSuccessMessage(`Paquete ${values.name} creado correctamente`)
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
          Paquetes
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          id: "",
          name: "",
          description: "",
          appliedDiscountPercentage: 0,
          containedServices: [],
          servicesQuantities: {},
          submit: null,
        }}
        title={"Crear paquete"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreatePackage)`
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
