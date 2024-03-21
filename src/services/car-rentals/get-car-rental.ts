import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { CarRental } from "types/car-rental";

const URL = `${API_BASE_URL}/services/car-rentals`;

export default async function getCarRental(id: string): Promise<CarRental> {
  try {
    const response = await axios.get<BackendResponse<CarRental>>(`${URL}/${id}`, {
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
