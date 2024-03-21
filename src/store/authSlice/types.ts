export interface AuthState {
  token: null | string;
  isAuth: boolean;
}

export interface AuthStored {
  token: string;
}

export const STORAGE_KEY = 'leafeon-auth-storage';
