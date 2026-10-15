import axios from "axios";
import { apiClient } from "../../../shared/api/apiClient";
import type { AuthUser, LoginCredentials } from "../model/types";

type ApiResponse<T> =
  | { success: true; message: T }
  | { success: false; message: string };

interface ApiUser {
  id: number;
  login: string;
  email: string;
  name?: string;
  surname?: string;
  registration_date?: string;
  last_active_date: string;
}

interface LoginApiResponse {
  token: string;
}

export class InvalidCredentialsError extends Error {
  constructor(message = "Неверный email или пароль") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

const normalizeUser = (user: ApiUser): AuthUser => ({
  id: user.id,
  login: user.login.trim(),
  email: user.email.trim(),
  name: user.name?.trim() ?? "",
  surname: user.surname?.trim() ?? "",
  registrationDate: user.registration_date?.trim(),
  lastActiveDate: user.last_active_date.trim(),
});

const isUnauthorizedError = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return [400, 401, 403].includes(error.response?.status ?? 0);
};

export const authRepository = {
  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const { data } = await apiClient.post<ApiResponse<LoginApiResponse>>(
        "/auth_email_password/",
        credentials,
      );

      if (!data.success) {
        throw new InvalidCredentialsError(data.message);
      }

      if (!data.message.token) {
        throw new InvalidCredentialsError();
      }

      return data.message.token.trim();
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw error;
      }

      if (isUnauthorizedError(error)) {
        throw new InvalidCredentialsError();
      }

      throw error;
    }
  },

  async getMe(): Promise<AuthUser> {
    const { data } =
      await apiClient.post<ApiResponse<ApiUser>>("/me/");

    if (!data.success) {
      throw new Error(data.message);
    }

    return normalizeUser(data.message);
  },
};
