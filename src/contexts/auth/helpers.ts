import Cookies from "js-cookie";
import { ILoginService, LoginService } from "../../services/login";
import { AuthAction, LoginActionTypes, LoginDataInput } from ".";

const oneHourCookieTime = 1 / 24;

export async function loginUser(
  dispatch: React.Dispatch<AuthAction>,
  data: LoginDataInput,
  service: ILoginService
) {
  dispatch({ type: LoginActionTypes.START_LOGIN });

  try {
    let requestToken = Cookies.get("request-token") || "";

    if (!requestToken) {
      requestToken = (await LoginService.requestToken()) || "";

      Cookies.set("request-token", requestToken, {
        expires: oneHourCookieTime,
      });
    }

    const response = await service.login({ ...data, token: requestToken });

    if (response.success) {
      dispatch({ type: LoginActionTypes.FINISH_LOGIN, token: requestToken });

      return true;
    } else {
      dispatch({
        type: LoginActionTypes.FAIL_LOGIN,
        error: response?.status_message || "",
      });
    }
  } catch (e: any) {
    dispatch({ type: LoginActionTypes.FAIL_LOGIN, error: e?.message });

    return Promise.reject(e?.message);
  }
}
