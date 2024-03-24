import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";
import { BackendResponse } from "services/types";
import store from "store";
import { Profits, ProfitsDto } from "types/profits";

const URL = `${API_BASE_URL}/profits`;

export default async function getIntervalProfits(
  from: Date,
  to: Date
): Promise<Profits> {
  try {
    const response = await axios.get<BackendResponse<ProfitsDto>>(
      addQueryParams(URL, { from: from.toISOString(), to: to.toISOString() }),
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data.data.profits;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
