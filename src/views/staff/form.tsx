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
import { Employee } from "types/employee";
import useOccupationsOptions from "core/occupations/use-occupations-options";
import { OccupationsEnum } from "types/occupation";

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
          salary: Yup.number().required("El salario es requerido."),
          occupation: Yup.array(Yup.string()),
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
                  label="Nombre del empleado"
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
                  label="Apellido del empleado"
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
              <FormControl className="field-form" fullWidth>
                <InputLabel id="occupations-label">Cargos</InputLabel>
                <Select
                  labelId="occupations-label"
                  label="Cargos"
                  id="occupations"
                  name="occupations"
                  multiple
                  value={values.occupations as unknown as OccupationsEnum[]}
                  onChange={handleChange}
                  renderValue={(selected: string[]) =>
                    selected
                      .map((s) => occupations.find((o) => o.value === s)?.label)
                      .join(", ")
                  }
                >
                  {occupations.map((occupation) => (
                    <MenuItem key={occupation.value} value={occupation.value}>
                      <ListItemText primary={occupation.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="salary"
                  label="Salario"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.salary}
                  helperText={touched.salary ? errors.salary : ""}
                  error={touched.salary && !!errors.salary}
                  name="salary"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="password"
                  label="Contraseña"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && !!errors.password}
                  name="password"
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

export type FormValues = Omit<Employee, "occupations"> & {
  password: string;
  occupations: OccupationsEnum[];
  submit: string | null;
};

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
