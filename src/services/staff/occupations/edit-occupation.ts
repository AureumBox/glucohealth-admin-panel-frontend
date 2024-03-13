import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { Occupation, OccupationsEnum } from "types/occupation";

const URL = `${API_BASE_URL}/staff`;

export default async function editEmployee(
  employeeId: string,
  occupationName: OccupationsEnum,
  body: OccupationPayload
): Promise<void> {
  try {
    await axios.patch(
      `${URL}/${employeeId}/occupations/${occupationName}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type OccupationPayload = Occupation;
