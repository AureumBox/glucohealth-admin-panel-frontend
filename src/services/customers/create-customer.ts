import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Customer } from "types/customer";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";

const URL = `${API_BASE_URL}/customers`;

export default async function createCustomer(
  body: CustomerPayload
): Promise<Customer> {
  try {
    const response = await axios.post<BackendResponse<Customer>>(URL, body, {
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

export type CustomerPayload = Omit<Customer, "id">;
