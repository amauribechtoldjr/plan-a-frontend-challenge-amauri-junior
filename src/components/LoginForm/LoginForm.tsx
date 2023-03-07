import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SignIn } from "../../contexts/auth";
import { loginUser } from "../../contexts/auth/helpers";
import { useAuth } from "../../hooks/useAuth";
import { LoginService } from "../../services/login";

import s from "./LoginForm.module.scss";

const LoginForm = () => {
  const { dispatch: loginDispatch, state } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<SignIn>({
    username: "",
    password: "",
  });

  const isPending = state.status === "pending";
  const isRejected = state.status === "rejected";

  const isValidLoginData =
    formState.password.length >= 6 && formState.username !== "";

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    loginUser(loginDispatch, { ...formState }, LoginService).then((success) => {
      if (success) {
        navigate("/last-movie");
      }
    });
  }

  if (state.user.isAuthenticated) {
    return <Navigate to={{ pathname: "/last-movie" }} />;
  }

  return (
    <div className={s["container"]}>
      <div className={s["form-container"]}>
        <form onSubmit={handleSubmit}>
          <div className={s["input-container"]}>
            <label htmlFor="username" className={s["label"]}>
              Username
            </label>
            <input
              data-testid="username-input"
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              className={s["login-input"]}
            />
          </div>
          <div className={s["input-container"]}>
            <label htmlFor="password" className={s["label"]}>
              Password
            </label>
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className={s["login-input"]}
            />
          </div>
          {!isPending && (
            <button
              data-testid="submit-button"
              type="submit"
              role="button"
              disabled={!isValidLoginData}
              className={s["login-button"]}
            >
              Login
            </button>
          )}
          {isPending && !isRejected && <span>Loading...</span>}
          {isRejected && <span>{state.error}</span>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
