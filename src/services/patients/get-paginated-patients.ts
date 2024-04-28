import { backendPaginatedResponseToPaginatedResponse } from "adapters/backend-paginated-response-to-paginated-response";
import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import {
  BackendPaginatedResponse,
  PaginateBody,
  PaginatedResponse,
} from "services/types";
import store from "store";
import { Patient } from "types/patient";

const URL = `${API_BASE_URL}/patients`;

export default async function getPaginatedPatients(
  body: PaginateBody
): Promise<PaginatedPatients> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BackendPaginatedPatients>(urlPaginated, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return backendPaginatedResponseToPaginatedResponse(response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

type BackendPaginatedPatients = BackendPaginatedResponse<Patient>;
type PaginatedPatients = PaginatedResponse<Patient>;
