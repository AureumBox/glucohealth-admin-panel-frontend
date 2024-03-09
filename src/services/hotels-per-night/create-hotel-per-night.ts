import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { HotelPerNight } from "types/hotel-per-night";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/hotels-per-night`;

export default async function createHotelPerNight(
  body: HotelPerNightPayload
): Promise<HotelPerNight> {
  try {
    const response = await axios.post<BackendResponse<HotelPerNight>>(
      URL,
      body,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type HotelPerNightPayload = Omit<HotelPerNight, "id">;
