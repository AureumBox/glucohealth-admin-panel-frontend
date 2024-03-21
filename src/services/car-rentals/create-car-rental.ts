import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { CarRental } from "types/car-rental";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/car-rentals`;

export default async function createCarRental(
  body: CarRentalPayload
): Promise<CarRental> {
  try {
    const response = await axios.post<BackendResponse<CarRental>>(
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

export type CarRentalPayload = Omit<CarRental, "id">;
