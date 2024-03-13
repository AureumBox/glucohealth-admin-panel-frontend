import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { OccupationsEnum } from "types/occupation";

const URL = `${API_BASE_URL}/staff`;

export default async function deleteEmployeOccupation(
  employeeId: string,
  occupationName: OccupationsEnum
): Promise<void> {
  try {
    await axios.delete(`${URL}/${employeeId}/occupations/${occupationName}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
