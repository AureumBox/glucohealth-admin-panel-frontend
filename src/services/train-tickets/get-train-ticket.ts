import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { TrainTicket } from "types/train-ticket";

const URL = `${API_BASE_URL}/services/train-tickets`;

export default async function getTrainTicket(id: string): Promise<TrainTicket> {
  try {
    const response = await axios.get<BackendResponse<TrainTicket>>(`${URL}/${id}`, {
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
