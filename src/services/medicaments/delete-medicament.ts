import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import store from "store";

const URL = `${API_BASE_URL}/medicaments`;

export default async function deleteMedicament(id: string): Promise<void> {
  try {
    console.log(id)
    const urlWithId = addQueryParams(URL, { id });
    await axios.delete(urlWithId, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
