import { FunctionComponent, useMemo, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
// material-ui
import MainCard from "components/cards/MainCard";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import SelectField from "components/SelectField";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Props } from "./types";
import useBookingsOptions from "core/bookings/use-bookings-options";
import useEmployeesOptions from "core/employees/use-employees-options";
import useBookingById from "core/bookings/use-booking-by-id";
import OrderActivitiesCrudField from "core/order-activities/create-field/order-activities-crud-field";
import getErrorOnArrayOrText from "helpers/get-error-on-array-or-text";

const USE_AUTOCOMPLETES = false;

const INPUT_ACTIVITIES: any = [];

const Form: FunctionComponent<Props> = ({
  className,
  title,
  onSubmit,
  initialValues,
  isUpdate,
}) => {
  const [bookingId, setBookingId] = useState<number | null>(
    initialValues.bookingId
  );
  const booking = useBookingById(bookingId);
  const bookingsOptions = useBookingsOptions({
    onlyWithoutOrder: true,
    includeBookingId: initialValues.bookingId,
  });
  const employeesOptions = useEmployeesOptions({
    onlyForAgencyRif: booking?.agencyRif || null,
    employeeDni: initialValues.employeeDni,
  })

  const useValidationSchema = useValidationScheme(!!isUpdate);

  const isCreated = !isUpdate;

  return (
    <div className={className}>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={useValidationSchema}
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
            <div
              className={`container-form-employees ${isUpdate && 'container-form-employees-full-grid'}`}
            >
              <MainCard className={"form-data"} title={title}>
              {/*RESERVA*/}
              <FormControl disabled={isUpdate} className="field-form" fullWidth>
              <SelectField
                  disabled={isUpdate}
                  className="field-form"
                  name="bookingId"
                  onChange={(e) => {
                    handleChange(e)
                    setBookingId(+e.target.value)
                  }}
                  label="Reserva"
                  onBlur={handleBlur}
                  options={bookingsOptions}
                  helperText={touched.bookingId ? errors.bookingId : ""}
                  error={touched.bookingId && !!errors.bookingId}
                  isAutocomplete={USE_AUTOCOMPLETES}
                  value={values.bookingId}
                />
              </FormControl>
              {/*FECHA DE ENTRADA*/}
              <FormControl className="form-data field-form"
              error={touched.entryTime && !!errors.entryTime}
              fullWidth
              >
                <DateTimePicker
                  label="Fecha entrada"
                  value={
                    dayjs(values.entryTime)
                  }
                  onChange={(newValue: any) => {
                    const newValueFormatted = newValue.format("DD-MM-YYYY HH:mm:ss");//'DD-MM-AAAA HH:MM:SS'
                    handleChange({
                      target: {
                        name: "entryTime",
                        id: "entryTime",
                        value: newValueFormatted || null,
                      } as any,
                    } as any);
                  }}
                />
                {(touched.entryTime && !!errors.entryTime) && (
                  <FormHelperText error>{touched.entryTime ? errors.entryTime : ""}</FormHelperText>
                )}
              </FormControl>
              {/*FECHA ESTIMADA DE SALIDA*/}
              <FormControl className="form-data field-form"
              error={touched.estimatedDeparture && !!errors.estimatedDeparture}
              fullWidth
              >
                <DateTimePicker
                  label="Fecha estimada de salida"
                  value={
                    dayjs(values.estimatedDeparture)
                  }
                  onChange={(newValue: any) => {
                    const newValueFormatted = newValue.format("DD-MM-YYYY HH:mm:ss");//'DD-MM-AAAA HH:MM:SS'
                    handleChange({
                      target: {
                        name: "estimatedDeparture",
                        id: "estimatedDeparture",
                        value: newValueFormatted || null,
                      } as any,
                    } as any);
                  }}
                />
                {(touched.estimatedDeparture && !!errors.estimatedDeparture) && (
                  <FormHelperText error>{touched.estimatedDeparture ? errors.estimatedDeparture : ""}</FormHelperText>
                )}
                </FormControl>
            {/*FECHA REAL DE SALIDA*/}
                {isUpdate && <FormControl className="form-data field-form"
                  error={touched.realDeparture && !!errors.realDeparture}
                  fullWidth
                >
                  <DateTimePicker
                    label="Fecha real de salida"
                    value={
                      dayjs(values.realDeparture)
                    }
                    onChange={(newValue: any) => {
                      const newValueFormatted = newValue.format("DD-MM-YYYY HH:mm:ss");//'DD-MM-AAAA HH:MM:SS'
                      handleChange({
                        target: {
                          name: "realDeparture",
                          id: "realDeparture",
                          value: newValueFormatted || null,
                        } as any,
                      } as any);
                    }}
                  />
                  {(touched.realDeparture && !!errors.realDeparture) && (
                    <FormHelperText error>{touched.realDeparture ? errors.realDeparture : ""}</FormHelperText>
                  )}
                </FormControl>
                }
              {/*EMPLEADO ANALISTA*/}
              {booking && (
                <FormControl className="field-form" fullWidth>
                  <SelectField
                    className="field-form"
                    name="employeeDni"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Analista"
                    options={employeesOptions}
                    helperText={
                      (!employeesOptions.length) ? "Esta agencia no tiene empleados" : (touched.employeeDni ? errors.employeeDni : "")
                    }
                    error={(!employeesOptions.length) ? true : (touched.employeeDni && !!errors.employeeDni)}
                    isAutocomplete={USE_AUTOCOMPLETES}
                    value={values.employeeDni}
                  />
                </FormControl>
                )
                }
                <FormControl className="field-form" fullWidth>
                    <TextField
                      id="responsibleDni"
                      label="DNI de responsable"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.responsibleDni}
                      helperText={touched.responsibleDni ? errors.responsibleDni : ''}
                      error={touched.responsibleDni && !!errors.responsibleDni}
                      name="responsibleDni"
                    />
                </FormControl>
                <FormControl className="field-form" fullWidth>
                    <TextField
                      id="responsibleName"
                      label="Nombre de responsable"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.responsibleName}
                      helperText={touched.responsibleName ? errors.responsibleName : ''}
                      error={touched.responsibleName && !!errors.responsibleName}
                      name="responsibleName"
                    />
                </FormControl>
              </MainCard>
              {
                isCreated && (
                  <div className={'form-data activites-crud'}>
                    <OrderActivitiesCrudField
                      orderId={0}
                      isParentUpdate={isUpdate}
                      //NOT use inputServices={values.services} (for moment)
                      inputServices={INPUT_ACTIVITIES}
                      booking={booking}
                      fieldName={'activities'}
                      onHandleFormChange={handleChange}
                      helperText={touched.activities ? (getErrorOnArrayOrText(errors.activities)) : ''}
                      error={touched.activities && !!errors.activities}
                    />
                  </div>
                )
              }
            </div>
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

function useValidationScheme(isUpdate: boolean) {
  return useMemo(() => {
    let extra = {};
    if (!isUpdate) {
      extra = {
        activities: Yup.array().min(1, 'Es requerida almenos 1 actividad'),
      };
    }

    return Yup.object().shape({
      responsibleDni: Yup.string()
        .max(16, 'La cédula debe ser menor a 16 caracteres')
        .matches(/^\d+$/, 'La cédula debe contener solo números')
        .nullable(),
      responsibleName: Yup.string()
        .max(64, 'El nombre debe ser menor a 64 caracteres')
        .nullable(),
      entryTime: Yup.string()
        .required('Debe especificar una fecha y tiempo de entrada del vehículo'),
      estimatedDeparture: Yup.string()
        .required('Debe especificar una fecha y tiempo estimado de salida para el vehículo'),
      realDeparture: Yup.string()
        .nullable(),
      bookingId: Yup.number().required(),
      employeeDni: Yup.string()
        .max(16, 'La cédula debe ser menor a 16 caracteres')
        .matches(/^\d+$/, 'La cédula debe contener solo números')
        .required('Es necesario indicar una cédula'),
      ...extra,
    })
  }, [isUpdate]);
}

export default Form;