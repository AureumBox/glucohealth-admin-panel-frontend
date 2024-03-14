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
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { Package } from "types/package";
import useServicesOptions from "core/services/use-services-options";

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const services = useServicesOptions();

  return (
    <div className={className}>
      <Formik<FormValues>
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("El nombre es requerido"),
          description: Yup.string().required("La descripción es requerida"),
          appliedDiscountPercentage: Yup.number()
            .required("El descuento es requerido")
            .min(0, "El descuento no puede ser menor a 0"),
          containedServices: Yup.array().required(
            "Los servicios son requeridos"
          ),
          price: Yup.number()
            .required("El precio es requerido")
            .min(0, "El precio no puede ser menor a 0"),
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
                  id="name"
                  label="Nombre del paquete"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && !!errors.name}
                  name="name"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="description"
                  label="Descripción"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  helperText={touched.description ? errors.description : ""}
                  error={touched.description && !!errors.description}
                  name="description"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="appliedDiscountPercentage"
                  label="Descuento"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.appliedDiscountPercentage}
                  helperText={
                    touched.appliedDiscountPercentage
                      ? errors.appliedDiscountPercentage
                      : ""
                  }
                  error={
                    touched.appliedDiscountPercentage &&
                    !!errors.appliedDiscountPercentage
                  }
                  name="appliedDiscountPercentage"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <InputLabel id="contained-services-label">Servicios</InputLabel>
                <Select
                  labelId="contained-services-label"
                  label="Servicios"
                  id="containedServices"
                  name="containedServices"
                  multiple
                  value={values.containedServices}
                  onChange={handleChange}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (s) => services.find((opt) => opt.value === s)?.label
                      )
                      .join(", ")
                  }
                >
                  {services.map((occupation) => (
                    <MenuItem key={occupation.value} value={occupation.value}>
                      <ListItemText primary={occupation.label} />
                    </MenuItem>
                  ))}
                </Select>
                <List>
                  {values.containedServices.map((cs) => (
                    <ListItem className="flex gap-2 justify-around">
                      <ListItemText>
                        {services.find((opt) => opt.value === cs)?.label}
                      </ListItemText>
                      <TextField
                        id={`${cs}-service-quantity`}
                        label="Cantidad"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={1}
                      ></TextField>
                    </ListItem>
                  ))}
                </List>
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="price"
                  label="Precio"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  helperText={touched.price ? errors.price : ""}
                  error={touched.price && !!errors.price}
                  name="price"
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

export interface FormValues extends Package {
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
