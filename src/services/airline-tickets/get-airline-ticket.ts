import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { AirlineTicket } from "types/airline-ticket";

const URL = `${API_BASE_URL}/services/airline-tickets`;

export default async function getAirlineTicket(id: string): Promise<AirlineTicket> {
  try {
    const response = await axios.get<BackendResponse<AirlineTicket>>(`${URL}/${id}`, {
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
