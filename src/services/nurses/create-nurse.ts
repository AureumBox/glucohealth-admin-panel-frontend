import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Nurse } from "types/nurse";

const URL = `${API_BASE_URL}/nurses`;

export default async function createNurse(body: NursePayload): Promise<Nurse> {
  try {
    const response = await axios.post<BackendResponse<Nurse>>(URL, body, {
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

export interface NursePayload extends Omit<Nurse, "id"> {}
