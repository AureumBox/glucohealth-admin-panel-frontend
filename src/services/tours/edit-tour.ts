import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Tour } from "types/tour";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/tours`;

export default async function editTour(
  id: string,
  body: TourPayload
): Promise<Tour> {
  try {
    const response = await axios.patch<BackendResponse<Tour>>(
      `${URL}/${id}`,
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

export type TourPayload = Omit<Tour, "id">;
