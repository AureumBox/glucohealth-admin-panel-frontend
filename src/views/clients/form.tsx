import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Customer } from "core/customers/types";

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  return (
    <div className={className}>
      <Formik<FormValues>
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          dni: Yup.string().required("El DNI es requerido."),
          firstName: Yup.string().required("El nombre es requerido."),
          lastName: Yup.string().required("El apellido es requerido."),
          address: Yup.string().required("La dirección es requerida."),
          birthdate: Yup.string().required(
            "La fecha de nacimiento es requerida."
          ),
          citizenship: Yup.string().required("La nacionalidad es requerida."),
          phoneNumber: Yup.string().required(
            "El número telefónico es requerido."
          ),
          email: Yup.string()
            .email("Correo electrónico inválido.")
            .required("El correo electrónico es requerido."),
        })}
        onSubmit={onSubmit as any}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <MainCard className={"form-data"} title={title}>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="dni"
                  label="DNI"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dni}
                  helperText={touched.dni ? errors.dni : ""}
                  error={touched.dni && !!errors.dni}
                  name="dni"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="firstName"
                  label="Nombre del cliente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  helperText={touched.firstName ? errors.firstName : ""}
                  error={touched.firstName && !!errors.firstName}
                  name="firstName"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="lastName"
                  label="Apellido del cliente"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  helperText={touched.lastName ? errors.lastName : ""}
                  error={touched.lastName && !!errors.lastName}
                  name="lastName"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="email"
                  label="Correo electrónico"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && !!errors.email}
                  name="email"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="phoneNumber"
                  label="Número telefónico"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  name="phoneNumber"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="citizenship"
                  label="Nacionalidad"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.citizenship}
                  helperText={touched.citizenship ? errors.citizenship : ""}
                  error={touched.citizenship && !!errors.citizenship}
                  name="citizenship"
                />
              </FormControl>
              <FormControl
                className="field-form"
                error={touched.birthdate && !!errors.birthdate}
                fullWidth
              >
                <DatePicker
                  label="Fecha de nacimiento"
                  value={dayjs(values.birthdate)}
                  onChange={(newValue: any) => {
                    const newValueFormatted = newValue.format("DD-MM-YYYY"); //'DD-MM-AAAA HH:MM:SS'
                    handleChange({
                      target: {
                        name: "birthdate",
                        id: "birthdate",
                        value: newValueFormatted || null,
                      } as any,
                    } as any);
                  }}
                />
                {touched.birthdate && !!errors.birthdate && (
                  <FormHelperText error>
                    {touched.birthdate ? (errors.birthdate as string) : ""}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="address"
                  label="Dirección"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  helperText={touched.address ? errors.address : ""}
                  error={touched.address && !!errors.address}
                  name="address"
                />
              </FormControl>
            </MainCard>
            <MainCard className={"form-data flex-column"}>
              {errors.submit && (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
              <Button variant="outlined" type="submit" color="primary">
                Guardar
              </Button>
            </MainCard>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface Props {
  isUpdate?: boolean;
  className?: string;
  onSubmit: OnSubmit;
  title: string;
  initialValues: FormValues;
}

export interface FormValues extends Customer {
  submit: string | null;
}

export type OnSubmit = (
  values: FormValues,
  helpers: FormikHelpers<FormValues>
) => void | Promise<any>;

export default styled(Form)`
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

  .field-form {
    margin: 12px 0px;
  }
`;
