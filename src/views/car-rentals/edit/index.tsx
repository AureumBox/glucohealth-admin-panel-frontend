import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router";
//own
import BackendError from "exceptions/backend-error";
import { useAppDispatch } from "../../../store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import Form, { FormValues } from "../form";
import useHotelPerNightById from "./use-hotel-per-night-by-id";
import useHotelPerNightId from "./use-hotel-per-night-id";
import { FormikHelpers } from "formik";
import { HotelPerNight } from "types/hotel-per-night";
import editHotelPerNight, {
  HotelPerNightPayload,
} from "services/hotels-per-night/edit-hotel-per-night";

const EditClient: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hotelPerNightId = useHotelPerNightId();
  const hotelPerNight = useHotelPerNightById(hotelPerNightId);

  const onSubmit = useCallback(
    async (
      values: HotelPerNight & { submit: null | string },
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
        await editHotelPerNight(hotelPerNightId!, payload);
        navigate("/hotels-per-night");
        dispatch(
          setSuccessMessage(`Hotel ${values.serviceName} editado correctamente`)
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
    [hotelPerNightId, navigate, dispatch]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Hotel
        </Typography>
      </MainCard>
      {hotelPerNight && (
        <Form
          isUpdate={true}
          initialValues={{
            ...hotelPerNight,
            submit: null,
          }}
          title={"Editar hotel"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditClient)`
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
