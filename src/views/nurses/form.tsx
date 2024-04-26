import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Nurse } from "types/nurse";
import useOccupationsOptions from "core/occupations/use-occupations-options";

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const occupations = useOccupationsOptions();

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
          phoneNumber: Yup.string().required(
            "El número telefónico es requerido."
          ),
          nationalId: Yup.string().required("El NUI es requerido."),
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
                  id="fullName"
                  label="Nombre completo del enfermero"
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
                  id="nationalId"
                  label="NUI"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nationalId}
                  helperText={touched.nationalId ? errors.nationalId : ""}
                  error={touched.nationalId && !!errors.nationalId}
                  name="nationalId"
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

export interface FormValues extends Nurse {
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
