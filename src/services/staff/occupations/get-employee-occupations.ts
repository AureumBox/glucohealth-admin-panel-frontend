import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { BackendResponse } from "services/types";
import store from "store";
import { Occupation } from "types/occupation";

const URL = `${API_BASE_URL}/staff`;

export default async function getEmployeeOcupations(
  employeeId: string
): Promise<Occupation[]> {
  try {
    const response = await axios.get<BackendResponse<Occupation[]>>(
      addQueryParams(`${URL}/${employeeId}/occupations`, {
        page: 1,
        "per-page": 3,
      }),
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
