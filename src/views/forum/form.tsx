import { FunctionComponent } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";
import { Medicament } from "types/medicament";
import { IconCirclePlus, IconTrash } from "@tabler/icons";

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
          tradeName: Yup.string().nullable(),
          genericName: Yup.string().required(
            "El nombre genérico es requerido."
          ),
          description: Yup.string().required("La descripción es requerida."),
          sideEffects: Yup.array()
            .of(Yup.string())
            .min(1, "Al menos un efecto secundario es requerido."),
          presentations: Yup.array()
            .of(Yup.string())
            .min(1, "Al menos una presentación es requerida."),
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
                  id="tradeName"
                  label="Nombre Del Foro"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tradeName}
                  helperText={touched.tradeName ? errors.tradeName : ""}
                  error={touched.tradeName && !!errors.tradeName}
                  name="tradeName"
                />
              </FormControl>             
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="description"
                  label="Descripción *"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  helperText={touched.description ? errors.description : ""}
                  error={touched.description && !!errors.description}
                  name="description"
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

export interface FormValues extends Medicament {
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

  .effect-list {
    display: grid;
    grid-column-gap: 20px;
  }

  .field-form2 {
    margin: 12px 0px;
    grid-column-gap: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
