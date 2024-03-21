import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { Event } from "types/event";

const URL = `${API_BASE_URL}/services/events`;

export default async function getEvent(id: string): Promise<Event> {
  try {
    const response = await axios.get<BackendResponse<Event>>(`${URL}/${id}`, {
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
