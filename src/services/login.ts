import { LoginDataInput } from "../contexts/auth";

interface LoginResponse {
  success: boolean;
  status_message?: string;
}

export interface ILoginService {
  login: (data: LoginDataInput) => Promise<LoginResponse>;
  requestToken: () => Promise<string>;
  getSessionId: (token: string) => Promise<string>;
}

async function login(data: LoginDataInput): Promise<LoginResponse> {
  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=8a732f489f66fcfb6feee9839dc02d76",
    {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        request_token: data.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();

  if (responseData?.success) {
    return { success: true };
  }

  return { status_message: responseData?.status_message, success: false };
}

async function requestToken() {
  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/token/new?api_key=8a732f489f66fcfb6feee9839dc02d76"
  );
  const data = await response.json();

  if (data?.success && data?.request_token) {
    return data?.request_token;
  }

  throw Error("Request token api offline.");
}

async function getSessionId(token: string) {
  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/session/new?api_key=8a732f489f66fcfb6feee9839dc02d76",
    {
      method: "POST",
      body: JSON.stringify({
        request_token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (data?.success && data?.session_id) {
    return data?.session_id;
  }

  throw Error("Request token api offline.");
}

export const LoginService: ILoginService = {
  login,
  requestToken,
  getSessionId,
};
