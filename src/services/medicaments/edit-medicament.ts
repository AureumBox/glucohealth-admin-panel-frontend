import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Medicament } from "types/medicament";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/medicaments`;

export default async function editMedicament(
  id: string,
  body: MedicamentPayload
): Promise<Medicament> {
  try {
    console.log(body)
    const urlWithId = addQueryParams(URL, { id });
    const response = await axios.put<BackendResponse<Medicament>>(
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

export type MedicamentPayload = Omit<Medicament, "id">;
