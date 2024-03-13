import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Employee } from "types/employee";
import BackendError from "exceptions/backend-error";
import { BackendResponse } from "services/types";
import store from "store";
import { OccupationsEnum } from "types/occupation";
import createEmployeeOccupation from "./occupations/create-occupation";
import deleteEmployeOccupation from "./occupations/delete-occupation";

const URL = `${API_BASE_URL}/staff`;

export default async function editEmployee(
  id: string,
  body: EmployeePayload
): Promise<Employee> {
  try {
    const response = await axios.patch<BackendResponse<Employee>>(
      `${URL}/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );

    await Promise.all(
      body.occupationsActions.map((o) => {
        const { action, occupationName } = o;
        if (action === "add")
          return createEmployeeOccupation(id, { occupationName });
        if (action === "remove")
          return deleteEmployeOccupation(id, occupationName);
        return 0;
      })
    );

    return response.data.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type EmployeePayload = Omit<Employee, "id" | "occupations"> & {
  occupationsActions: OcuppationAction[];
};
export interface OcuppationAction {
  occupationName: OccupationsEnum;
  action: "add" | "remove";
}
