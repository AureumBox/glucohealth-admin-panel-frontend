import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { TrainTicket } from "types/train-ticket";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/train-tickets`;

export default async function createTrainTicket(
  body: TrainTicketPayload
): Promise<TrainTicket> {
  try {
    const response = await axios.post<BackendResponse<TrainTicket>>(
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

export type TrainTicketPayload = Omit<TrainTicket, "id">;
