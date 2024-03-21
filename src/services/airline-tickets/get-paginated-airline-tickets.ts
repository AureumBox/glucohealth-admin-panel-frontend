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
import { AirlineTicket } from "types/airline-ticket";

const URL = `${API_BASE_URL}/services/airline-tickets`;

export default async function getPaginatedAirlineTickets(
  body: PaginateBody
): Promise<PaginatedAirlineTickets> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BackendPaginatedAirlineTickets>(
      urlPaginated,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return backendPaginatedResponseToPaginatedResponse(response.data);
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

type BackendPaginatedAirlineTickets = BackendPaginatedResponse<AirlineTicket>;
type PaginatedAirlineTickets = PaginatedResponse<AirlineTicket>;
