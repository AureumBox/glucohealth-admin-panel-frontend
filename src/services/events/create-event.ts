import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Event } from "types/event";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/services/events`;

export default async function createEvent(
  body: EventPayload
): Promise<Event> {
  try {
    const response = await axios.post<BackendResponse<Event>>(
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

export type EventPayload = Omit<Event, "id">;
