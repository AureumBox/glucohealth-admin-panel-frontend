import { FunctionComponent } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import styled from "styled-components";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { HotelPerNight } from "types/hotel-per-night";

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
          serviceName: Yup.string().required(
            "El nombre del servicio es requerido."
          ),
          serviceDescription: Yup.string().required(
            "La descripción del servicio es requerida."
          ),
          serviceLocation: Yup.string().required(
            "La ubicación del servicio es requerida."
          ),
          servicePrice: Yup.number().required(
            "El precio del servicio es requerido."
          ),
          serviceTimestamp: Yup.date().required(
            "La fecha de inicio del servicio es requerida."
          ),
          numberOfNights: Yup.number().required(
            "El número de noches es requerido."
          ),
          numberOfStars: Yup.number().required(
            "El número de estrellas es requerido."
          ),
          numberOfRooms: Yup.number().required(
            "El número de habitaciones es requerido."
          ),
          allowedNumberOfPeoplePerRoom: Yup.number().required(
            "El número de personas por habitación es requerido."
          ),
          checkoutTimestamp: Yup.date().required(
            "La fecha de salida del servicio es requerida."
          ),
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
                  id="serviceName"
                  label="Nombre"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.serviceName}
                  helperText={touched.serviceName ? errors.serviceName : ""}
                  error={touched.serviceName && !!errors.serviceName}
                  name="serviceName"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="serviceDescription"
                  label="Descripción"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.serviceDescription}
                  helperText={
                    touched.serviceDescription ? errors.serviceDescription : ""
                  }
                  error={
                    touched.serviceDescription && !!errors.serviceDescription
                  }
                  name="serviceDescription"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="serviceLocation"
                  label="Ubicación"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.serviceLocation}
                  helperText={
                    touched.serviceLocation ? errors.serviceLocation : ""
                  }
                  error={touched.serviceLocation && !!errors.serviceLocation}
                  name="serviceLocation"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="servicePrice"
                  label="Precio"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.servicePrice}
                  helperText={touched.servicePrice ? errors.servicePrice : ""}
                  error={touched.servicePrice && !!errors.servicePrice}
                  name="servicePrice"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="numberOfNights"
                  label="Nro. de noches"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.numberOfNights}
                  helperText={
                    touched.numberOfNights ? errors.numberOfNights : ""
                  }
                  error={touched.numberOfNights && !!errors.numberOfNights}
                  name="numberOfNights"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="numberOfStars"
                  label="Nro. de estrellas"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.numberOfStars}
                  helperText={touched.numberOfStars ? errors.numberOfStars : ""}
                  error={touched.numberOfStars && !!errors.numberOfStars}
                  name="numberOfStars"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="numberOfRooms"
                  label="Nro. de habitaciones"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.numberOfRooms}
                  helperText={touched.numberOfRooms ? errors.numberOfRooms : ""}
                  error={touched.numberOfRooms && !!errors.numberOfRooms}
                  name="numberOfRooms"
                />
              </FormControl>
              <FormControl className="field-form" fullWidth>
                <TextField
                  id="allowedNumberOfPeoplePerRoom"
                  label="Nro. de personas por habitación"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.allowedNumberOfPeoplePerRoom}
                  helperText={
                    touched.allowedNumberOfPeoplePerRoom
                      ? errors.allowedNumberOfPeoplePerRoom
                      : ""
                  }
                  error={
                    touched.allowedNumberOfPeoplePerRoom &&
                    !!errors.allowedNumberOfPeoplePerRoom
                  }
                  name="allowedNumberOfPeoplePerRoom"
                />
              </FormControl>
              <FormControl
                className="field-form"
                error={touched.serviceTimestamp && !!errors.serviceTimestamp}
                fullWidth
              >
                <DatePicker
                  label="Fecha de entrada"
                  value={dayjs(values.serviceTimestamp)}
                  onChange={(newValue: any) => {
                    const newValueFormatted = newValue.format("DD-MM-YYYY"); //'DD-MM-AAAA HH:MM:SS'
                    handleChange({
                      target: {
                        name: "serviceTimestamp",
                        id: "serviceTimestamp",
                        value: newValueFormatted || null,
                      } as any,
                    } as any);
                  }}
                />
                {touched.serviceTimestamp && !!errors.serviceTimestamp && (
                  <FormHelperText error>
                    {touched.serviceTimestamp
                      ? (errors.serviceTimestamp as string)
                      : ""}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                className="field-form"
                error={touched.checkoutTimestamp && !!errors.checkoutTimestamp}
                fullWidth
              >
                <DatePicker
                  label="Fecha de salida"
                  value={dayjs(values.checkoutTimestamp)}
                  onChange={(newValue: any) => {
                    const newValueFormatted = newValue.format("DD-MM-YYYY"); //'DD-MM-AAAA HH:MM:SS'
                    handleChange({
                      target: {
                        name: "checkoutTimestamp",
                        id: "checkoutTimestamp",
                        value: newValueFormatted || null,
                      } as any,
                    } as any);
                  }}
                />
                {touched.checkoutTimestamp && !!errors.checkoutTimestamp && (
                  <FormHelperText error>
                    {touched.checkoutTimestamp
                      ? (errors.checkoutTimestamp as string)
                      : ""}
                  </FormHelperText>
                )}
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

export interface FormValues extends HotelPerNight {
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
