import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Imc } from "types/imc";

const URL = `${API_BASE_URL}/imc`;

export default async function createImc(body: ImcPayload): Promise<Imc> {
  try {
    const response = await axios.post<BackendResponse<Imc>>(URL, body, {
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

export interface ImcPayload extends Omit<Imc, "id"> {}