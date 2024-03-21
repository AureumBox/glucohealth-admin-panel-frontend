import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { AirlineTicket } from "types/airline-ticket";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/airline-tickets`;

export default async function createAirlineTicket(
  body: AirlineTicketPayload
): Promise<AirlineTicket> {
  try {
    const response = await axios.post<BackendResponse<AirlineTicket>>(
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

export type AirlineTicketPayload = Omit<AirlineTicket, "id">;
