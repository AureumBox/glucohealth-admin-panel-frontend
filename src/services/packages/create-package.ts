import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";
import { BackendResponse } from "services/types";
import { Package } from "types/package";

const URL = `${API_BASE_URL}/packages`;

export default async function createPackage(
  body: PackagePayload
): Promise<Package> {
  try {
    const response = await axios.post<BackendResponse<Package>>(URL, body, {
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

export type PackagePayload = Omit<Package, "id" | "price">;
