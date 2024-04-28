import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { BackendResponse } from "services/types";
import store from "store";
import { Patient } from "types/patient";

const URL = `${API_BASE_URL}/patient`;

export default async function getPatient(id: string): Promise<Patient> {
  try {
    const urlWithId = addQueryParams(URL, { id });
    const response = await axios.get<BackendResponse<Patient>>(urlWithId, {
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
