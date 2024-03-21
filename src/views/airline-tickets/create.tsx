import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../store/index";
import Form, { FormValues } from "./form";
import { FormikHelpers } from "formik";
import createHotelPerNight, {
  HotelPerNightPayload,
} from "services/hotels-per-night/create-hotel-per-night";
import { HotelPerNight } from "types/hotel-per-night";

const CreateHotelPerNight: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    async (
      values: HotelPerNight & { submit: string | null },
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const payload: HotelPerNightPayload = {
          serviceName: values.serviceName,
          serviceDescription: values.serviceDescription,
          serviceLocation: values.serviceLocation,
          servicePrice: values.servicePrice,
          serviceTimestamp: values.serviceTimestamp,
          numberOfNights: values.numberOfNights,
          numberOfStars: values.numberOfStars,
          numberOfRooms: values.numberOfRooms,
          allowedNumberOfPeoplePerRoom: values.allowedNumberOfPeoplePerRoom,
          checkoutTimestamp: values.checkoutTimestamp,
        };
        console.log(payload);
        await createHotelPerNight(payload);
        navigate("/hotels-per-night");
        dispatch(
          setSuccessMessage(`Hotel ${values.serviceName} creado correctamente`)
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
    [dispatch, navigate]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Hoteles
        </Typography>
      </MainCard>

      <Form
        initialValues={{
          id: "",
          serviceName: "",
          serviceDescription: "",
          serviceLocation: "",
          servicePrice: 0,
          serviceTimestamp: new Date(),
          numberOfNights: 0,
          numberOfStars: 0,
          numberOfRooms: 0,
          allowedNumberOfPeoplePerRoom: 0,
          checkoutTimestamp: new Date(),
          submit: null,
        }}
        title={"Crear hotel"}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(CreateHotelPerNight)`
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
