import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import { BackendResponse } from 'services/types';

const URL = `${API_BASE_URL}/auth/login`;

export default async function login(body: LoginBody): Promise<LoginResponseData> {
  try {
    const response = await axios.post<BackendResponse<LoginResponseData>>(URL, body);
    return response.data.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface LoginBody {
  employeeEmail: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
}
