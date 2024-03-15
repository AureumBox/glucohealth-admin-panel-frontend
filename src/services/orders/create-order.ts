import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Order } from "types/order";

const URL = `${API_BASE_URL}/orders`;

export default async function createOrder(body: OrderPayload): Promise<Order> {
  try {
    const response = await axios.post<BackendResponse<Order>>(URL, body, {
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

export type OrderPayload = Omit<Order, "id" | "price">;
