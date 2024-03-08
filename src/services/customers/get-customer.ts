import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Customer } from "core/customers/types";
import BackendError from "exceptions/backend-error";
import { BackendReponse } from "services/types";
import store from "store";

const URL = `${API_BASE_URL}/customers`;

export default async function getCustomer(id: string): Promise<Customer> {
  try {
    const response = await axios.get<BackendReponse<Customer>>(`${URL}/${id}`, {
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
