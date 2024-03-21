import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BusTicket } from "types/bus-ticket";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/bus-tickets`;

export default async function createBusTicket(
  body: BusTicketPayload
): Promise<BusTicket> {
  try {
    const response = await axios.post<BackendResponse<BusTicket>>(
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

export type BusTicketPayload = Omit<BusTicket, "id">;
