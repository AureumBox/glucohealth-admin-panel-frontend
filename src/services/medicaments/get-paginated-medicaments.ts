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
import { Medicament } from "types/medicament";

const URL = `${API_BASE_URL}/medicaments`;

export default async function getPaginatedMedicaments(
  body: PaginateBody
): Promise<PaginatedMedicaments> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BackendPaginatedMedicaments>(urlPaginated, {
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

type BackendPaginatedMedicaments = BackendPaginatedResponse<Medicament>;
type PaginatedMedicaments = PaginatedResponse<Medicament>;
