import { LoginDataInput } from "../contexts/auth";
import { get, post } from "./api";

interface LoginResponse {
  success: boolean;
  status_message?: string;
}

interface TokenResponse {
  success: boolean;
  request_token: string;
}

export interface ILoginService {
  login: (data: LoginDataInput) => Promise<LoginResponse>;
  requestToken: () => Promise<string>;
}

async function login(data: LoginDataInput): Promise<LoginResponse> {
  const responseData = await post<LoginResponse>(
    "authentication/token/validate_with_login",
    JSON.stringify({
      username: data.username,
      password: data.password,
      request_token: data.token,
    })
  );

  if (responseData?.success) {
    return { success: true };
  }

  return { status_message: responseData?.status_message, success: false };
}

async function requestToken() {
  const data = await get<TokenResponse>("authentication/token/new");

  if (data?.success && data?.request_token) {
    return data?.request_token;
  }

  throw Error("Request token api offline.");
}

export const LoginService: ILoginService = {
  login,
  requestToken,
};
