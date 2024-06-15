import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Patient } from "types/patient";

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
          fullName: Yup.string().required("El nombre es requerido."),
          email: Yup.string()
            .email("Correo electrónico inválido.")
            .required("El correo electrónico es requerido."),
          phoneNumber: Yup.string()
            .required("El número telefónico es requerido.")
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Ingrese un numero de teléfono válido"
            ),
          nationalId: Yup.string().required("La CI es requerida."),
          birthdate: Yup.string().nullable(),
          heightInCm: Yup.string().nullable(),
          weightInKg: Yup.string().nullable(),
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
              <FormHelperText>
                Los campos marcados con (*) son obligatorios.{" "}
              </FormHelperText>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="fullName"
                  label="Nombre completo del paciente *"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  helperText={touched.fullName ? errors.fullName : ""}
                  error={touched.fullName && !!errors.fullName}
                  name="fullName"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="email"
                  label="Correo electrónico *"
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
                  label="Número telefónico *"
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
                  id="nationalId"
                  label="CI *"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nationalId}
                  helperText={touched.nationalId ? errors.nationalId : ""}
                  error={touched.nationalId && !!errors.nationalId}
                  name="nationalId"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <DatePicker
                  label="Fecha de nacimiento"
                  value={dayjs(values.birthdate)}
                  onChange={(newValue) => {
                    handleChange({
                      target: {
                        name: "birthdate",
                        id: "birthdate",
                        value: newValue || null,
                      },
                    });
                    console.log(newValue);
                  }}
                  maxDate={dayjs().subtract(1, "year")} 
                  defaultValue={null} 
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="weightInKg"
                  label="Peso"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weightInKg}
                  helperText={touched.weightInKg ? errors.weightInKg : ""}
                  error={touched.weightInKg && !!errors.weightInKg}
                  name="weightInKg"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="heightInCm"
                  label="Altura"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">cm</InputAdornment>
                    ),
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.heightInCm}
                  helperText={touched.heightInCm ? errors.heightInCm : ""}
                  error={touched.heightInCm && !!errors.heightInCm}
                  name="heightInCm"
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

export interface FormValues extends Patient {
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
