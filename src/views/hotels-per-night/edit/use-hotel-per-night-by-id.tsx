import { useCallback, useEffect, useState } from "react";
// material-ui
import BackendError from "exceptions/backend-error";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import { HotelPerNight } from "types/hotel-per-night";
import getHotelPerNight from "services/hotels-per-night/get-hotel-per-night";

export default function useHotelPerNightById(hotelPerNightId: string | null) {
  const dispatch = useAppDispatch();
  const [hotelPerNight, setHotelPerNight] = useState<HotelPerNight | null>(
    null
  );

  const fetchHotelPerNight = useCallback(
    async (id: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await getHotelPerNight(id);
        console.log(response);
        setHotelPerNight(response);
      } catch (error) {
        if (error instanceof BackendError)
          dispatch(setErrorMessage(error.getMessage()));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (hotelPerNightId) fetchHotelPerNight(hotelPerNightId);
  }, [fetchHotelPerNight, hotelPerNightId]);

  return hotelPerNight;
}
