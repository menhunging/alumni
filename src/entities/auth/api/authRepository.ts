import axios from "axios";
import { apiClient } from "../../../shared/api/apiClient";
import type {
  AuthUser,
  LoginWithCodeInput,
  LoginCredentials,
  PendingCodeLogin,
  RequestLoginCodeInput,
} from "../model/types";

type ApiResponse<T> =
  | { success: true; message: T }
  | { success: false; message: string };

interface ApiUser {
  id: number;
  login: string;
  email: string;
  name?: string;
  surname?: string;
  success_profile: 0 | 1 | "0" | "1";
  registration_date?: string;
  last_active_date: string;
}

interface AuthenticationApiResponse extends ApiUser {
  token: string;
}

interface EmailLoginApiResponse {
  id: number;
  email: string;
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
  profileCompleted: String(user.success_profile) === "1",
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
      const { data } = await apiClient.post<
        ApiResponse<AuthenticationApiResponse>
      >("/auth_email_password/", credentials);

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

  async requestLoginCode(
    input: RequestLoginCodeInput,
  ): Promise<PendingCodeLogin> {
    const { data } = await apiClient.post<ApiResponse<EmailLoginApiResponse>>(
      "/auth_email/",
      input,
    );

    if (!data.success) {
      throw new Error(data.message);
    }

    const { id, email } = data.message;

    if (
      typeof id !== "number" ||
      typeof email !== "string" ||
      email.trim() === ""
    ) {
      throw new Error("Сервер вернул некорректные данные для входа по коду");
    }

    return {
      userId: id,
      email: email.trim(),
    };
  },

  async loginWithCode({ userId, code }: LoginWithCodeInput): Promise<string> {
    const { data } = await apiClient.post<
      ApiResponse<AuthenticationApiResponse>
    >("/check_code_auth_email/", {
      id_user: String(userId),
      code,
    });

    if (!data.success) {
      throw new Error(data.message);
    }

    const token = data.message.token;

    if (typeof token !== "string" || token.trim() === "") {
      throw new Error("Сервер не вернул токен авторизации");
    }

    return token.trim();
  },

  async getMe(): Promise<AuthUser> {
    const { data } = await apiClient.post<ApiResponse<ApiUser>>("/me/");

    if (!data.success) {
      throw new Error(data.message);
    }

    return normalizeUser(data.message);
  },
};
