import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { Order } from "types/order";

const URL = `${API_BASE_URL}/orders`;

export default async function getOrder(id: string): Promise<Order> {
  try {
    const response = await axios.get<BackendResponse<Order>>(`${URL}/${id}`, {
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
