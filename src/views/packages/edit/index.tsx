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
import usePackageById from "./use-package-by-id";
import usePackageId from "./use-package-id";
import { FormikHelpers } from "formik";
import editPackage, { PackagePayload } from "services/packages/edit-package";

const EditPackage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packageId = usePackageId();
  const fetchedPackage = usePackageById(packageId);

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
        await editPackage(packageId!, payload);
        navigate("/packages");
        dispatch(
          setSuccessMessage(`Paquete ${values.name} editado correctamente`)
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
    [packageId, navigate, dispatch]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Paquetes
        </Typography>
      </MainCard>
      {fetchedPackage && (
        <Form
          isUpdate={true}
          initialValues={{
            ...{
              ...fetchedPackage,
              containedServices: fetchedPackage.containedServices.map(
                (cs) => cs.serviceId
              ),
            },
            servicesQuantities: fetchedPackage.containedServices.reduce(
              (p: Record<string, number>, c) => {
                p[c.serviceId] = c.amountContained;
                return p;
              },
              {}
            ),
            submit: null,
          }}
          title={"Editar paquete"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditPackage)`
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
