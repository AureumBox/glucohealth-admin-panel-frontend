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
import createEmployee, {
  EmployeePayload,
} from "services/staff/create-employee";
import { OccupationsEnum } from "types/occupation";

const CreateEmployee: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: Omit<EmployeePayload, "occupations"> & {
        occupations: OccupationsEnum[];
        submit: string | null;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const payload: EmployeePayload = {
          dni: values.dni,
          firstName: values.firstName,
          lastName: values.lastName,
          birthdate: values.birthdate,
          email: values.email,
          address: values.address,
          citizenship: values.citizenship,
          phoneNumber: values.phoneNumber,
          salary: values.salary,
          password: values.password,
          occupations: values.occupations.map((o) => ({
            occupationName: o,
          })),
        };
        console.log(payload);
        await createEmployee(payload);
        navigate("/staff");
        dispatch(
          setSuccessMessage(`Empleado ${values.firstName} creado correctamente`)
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
          Empleados
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          id: "",
          dni: "",
          birthdate: new Date(),
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          citizenship: "",
          phoneNumber: "",
          salary: 0,
          occupations: [],
          password: "",
          submit: null,
        }}
        title={"Crear empleado"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateEmployee)`
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
