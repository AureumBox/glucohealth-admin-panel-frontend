import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { Nurse } from "types/nurse";

const URL = `${API_BASE_URL}/nurses`;

export default async function getNurse(id: string): Promise<Nurse> {
  try {
    const response = await axios.get<BackendResponse<Nurse>>(`${URL}/${id}`, {
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
