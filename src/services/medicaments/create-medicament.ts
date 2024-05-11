import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Medicament } from "types/medicament";

const URL = `${API_BASE_URL}/medicaments`;

export default async function createMedicament(body: MedicamentPayload): Promise<Medicament> {
  try {
    const response = await axios.post<BackendResponse<Medicament>>(URL, body, {
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

export interface MedicamentPayload extends Omit<Medicament, "id"> {}
