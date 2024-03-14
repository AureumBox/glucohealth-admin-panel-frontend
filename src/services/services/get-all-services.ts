import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { BackendPaginatedResponse } from "services/types";
import store from "store";
import { Service } from "types/service";

const URL = `${API_BASE_URL}/services`;

export default async function getAllServices(): Promise<Service[]> {
  try {
    const response = await axios.get<BackendPaginatedResponse<Service>>(
      addQueryParams(URL, { page: 1, "per-page": 50 }),
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data.data.items;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
