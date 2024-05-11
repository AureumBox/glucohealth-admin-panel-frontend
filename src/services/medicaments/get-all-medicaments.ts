//TODO: Implement this endpoint in the backend

import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Medicament } from "types/medicament";

const URL = `${API_BASE_URL}/medicaments/all`;

export default async function getAllMedicaments(): Promise<Medicament[]> {
  try {
    const response = await axios.get<Medicament[]>(URL, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
