import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../contexts/auth";
import { loginUser } from "../../contexts/auth/helpers";
import { useAuth } from "../../hooks/useAuth";
import { LoginService } from "../../services/login";

import s from "./LoginForm.module.scss";

const LoginForm = () => {
  const { dispatch: loginDispatch, state } = useAuth();
  const navigate = useNavigate();

  const isPending = state.status === "pending";
  const isRejected = state.status === "rejected";

  const [formState, setFormState] = useState<SignIn>({
    username: "planatest",
    password: "123456",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    loginUser(
      loginDispatch,
      { ...formState, token: state.user.request_token },
      LoginService
    ).then((success) => {
      if (success) {
        navigate("/last-movie");
      }
    });
  }

  useEffect(() => {
    if (state.user.isAuthenticated) {
      navigate("/last-movie");
    }
  }, [state]);

  return (
    <div className={s["container"]}>
      <div className={s["form-container"]}>
        <form onSubmit={handleSubmit}>
          <div className={s["input-container"]}>
            <label htmlFor="username" className={s["label"]}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              className={s["login-input"]}
            />
          </div>
          <div className={s["input-container"]}>
            <label htmlFor="password" className={s["label"]}>
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className={s["login-input"]}
            />
          </div>
          {!isPending && (
            <button
              type="submit"
              disabled={!formState.username || !formState.password}
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
