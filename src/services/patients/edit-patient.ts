import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Patient } from "types/patient";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/patients`;

export default async function editPatient(
  id: string,
  body: PatientPayload
): Promise<Patient> {
  try {
    const urlWithId = addQueryParams(URL, { id });
    const response = await axios.patch<BackendResponse<Patient>>(
      urlWithId,
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

export type PatientPayload = Omit<Patient, "id">;
