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
import { HotelPerNight } from "types/hotel-per-night";

const URL = `${API_BASE_URL}/services/hotels-per-night`;

export default async function getPaginatedHotelsPerNight(
  body: PaginateBody
): Promise<PaginatedHotelsPerNight> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BackendPaginatedHotelsPerNight>(
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

type BackendPaginatedHotelsPerNight = BackendPaginatedResponse<HotelPerNight>;
type PaginatedHotelsPerNight = PaginatedResponse<HotelPerNight>;
