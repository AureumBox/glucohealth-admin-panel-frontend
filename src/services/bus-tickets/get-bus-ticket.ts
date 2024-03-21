import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { BusTicket } from "types/bus-ticket";

const URL = `${API_BASE_URL}/services/bus-tickets`;

export default async function getBusTicket(id: string): Promise<BusTicket> {
  try {
    const response = await axios.get<BackendResponse<BusTicket>>(`${URL}/${id}`, {
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
