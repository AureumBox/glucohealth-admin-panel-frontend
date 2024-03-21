//TODO: Implement this endpoint in the backend

import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BusTicket } from "types/bus-ticket";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/bus-tickets/all`;

export default async function getAllBusTickets(): Promise<BusTicket[]> {
  try {
    const response = await axios.get<BackendResponse<BusTicket[]>>(URL, {
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
