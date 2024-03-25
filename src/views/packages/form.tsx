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
        })}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
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
                  unselectable="on"
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
                  {services.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      <ListItemText primary={s.label} />
                    </MenuItem>
                  ))}
                </Select>
                <List>
                  {values.containedServices.map((cs) => (
                    <ListItem key={cs} className="flex gap-2 justify-center">
                      <ListItemText className="font-bold">
                        {services.find((opt) => opt.value === cs)?.label}
                      </ListItemText>
                      <div>
                        <Button
                          disabled={
                            values.servicesQuantities[cs] <= 1 ||
                            !values.servicesQuantities[cs]
                          }
                          onClick={() =>
                            setFieldValue("servicesQuantities", {
                              ...values.servicesQuantities,
                              [cs]: values.servicesQuantities[cs] - 1,
                            })
                          }
                        >
                          -
                        </Button>
                        <strong>{values.servicesQuantities[cs] ?? 1}</strong>
                        <Button
                          onClick={() =>
                            setFieldValue("servicesQuantities", {
                              ...values.servicesQuantities,
                              [cs]: (values.servicesQuantities[cs] ?? 1) + 1,
                            })
                          }
                        >
                          +
                        </Button>
                      </div>
                    </ListItem>
                  ))}
                </List>
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

export interface FormValues
  extends Omit<Package, "containedServices" | "price"> {
  containedServices: string[];
  servicesQuantities: Record<string, number>;
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
