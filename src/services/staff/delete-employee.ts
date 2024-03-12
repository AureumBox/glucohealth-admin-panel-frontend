import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Employee } from "types/employee";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";

const URL = `${API_BASE_URL}/staff`;

export default async function deleteEmployee(id: string): Promise<Employee> {
  try {
    const response = await axios.delete<BackendResponse<Employee>>(
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

export type EmployeePayload = Omit<Employee, "id">;
