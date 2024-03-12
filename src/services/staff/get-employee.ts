import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { Employee } from "types/employee";

const URL = `${API_BASE_URL}/staff`;

export default async function getEmployee(id: string): Promise<Employee> {
  try {
    const response = await axios.get<BackendResponse<Employee>>(
      `${URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
