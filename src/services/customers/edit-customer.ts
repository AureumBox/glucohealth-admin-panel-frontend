import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Customer } from "core/customers/types";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/customers`;

export default async function editClient(
  id: string,
  body: CustomerPayload
): Promise<Customer> {
  try {
    const response = await axios.patch<Customer>(`${URL}/${id}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type CustomerPayload = Omit<Customer, "id">;
