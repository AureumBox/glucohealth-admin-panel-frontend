//TODO: Implement this endpoint in the backend

import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Nurse } from "types/nurse";

const URL = `${API_BASE_URL}/nurses/all`;

export default async function getAllNurses(): Promise<Nurse[]> {
  try {
    const response = await axios.get<Nurse[]>(URL, {
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
