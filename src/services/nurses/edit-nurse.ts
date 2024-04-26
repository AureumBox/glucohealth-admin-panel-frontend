import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Nurse } from "types/nurse";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/nurses`;

export default async function editNurse(
  id: string,
  body: NursePayload
): Promise<Nurse> {
  try {
    const urlWithId = addQueryParams(URL, { id });
    const response = await axios.patch<BackendResponse<Nurse>>(
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

export type NursePayload = Omit<Nurse, "id">;
