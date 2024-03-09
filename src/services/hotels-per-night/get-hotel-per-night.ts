import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { HotelPerNight } from "types/hotel-per-night";

const URL = `${API_BASE_URL}/services/hotels-per-night`;

export default async function getHotelPerNight(id: string): Promise<HotelPerNight> {
  try {
    const response = await axios.get<BackendResponse<HotelPerNight>>(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
