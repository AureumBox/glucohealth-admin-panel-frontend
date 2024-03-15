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
import { Order } from "types/order";

const URL = `${API_BASE_URL}/orders`;

export default async function getPaginatedOrders(
  body: PaginateBody
): Promise<PaginatedOrders> {
  try {
    const urlPaginated = addQueryParams(URL, body);
    const response = await axios.get<BackendPaginatedOrders>(urlPaginated, {
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

type BackendPaginatedOrders = BackendPaginatedResponse<Order>;
type PaginatedOrders = PaginatedResponse<Order>;
