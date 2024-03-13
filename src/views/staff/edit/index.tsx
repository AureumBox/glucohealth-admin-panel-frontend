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
import useEmployeeById from "./use-employee-by-dni";
import useEmployeeId from "./use-employee-by-id";
import { FormikHelpers } from "formik";
import editEmployee, { EmployeePayload } from "services/staff/edit-employee";
import { OccupationsEnum } from "types/occupation";

const EditEmployee: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeId = useEmployeeId();
  const employee = useEmployeeById(employeeId);

  const onSubmit = useCallback(
    async (
      values: Omit<EmployeePayload, "occupationsActions" | "occupations"> & {
        occupations: OccupationsEnum[];
        submit: null | string;
      },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);

        const prevOccupations = employee!.occupations.map(
          (o) => o.occupationName
        )!;

        const { occupations: _, ...neededValues } = values;

        const payload: EmployeePayload = {
          ...neededValues,
          occupationsActions: [
            ...values.occupations
              .filter((o) => !prevOccupations.includes(o))
              .map((o: OccupationsEnum) => ({
                occupationName: o,
                action: "add" as const,
              })),
            ...prevOccupations
              .filter((o) => !values.occupations.includes(o))
              .map((o: OccupationsEnum) => ({
                occupationName: o,
                action: "remove" as const,
              })),
          ],
        };
        await editEmployee(employeeId!, payload);
        navigate("/staff");
        dispatch(
          setSuccessMessage(
            `Empleado ${values.firstName} editado correctamente`
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
    [employeeId, navigate, dispatch, employee]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Empleados
        </Typography>
      </MainCard>
      {employee && (
        <Form
          isUpdate={true}
          initialValues={{
            ...employee,
            occupations: employee.occupations.map((o) => o.occupationName),
            submit: null,
          }}
          title={"Editar empleado"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditEmployee)`
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
