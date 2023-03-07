import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("Should render component", async () => {
    const { getByText } = render(<LoginForm />, { wrapper: BrowserRouter });

    expect(getByText("Username")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });

  test("Should enable login button when login data is valid", async () => {
    const { findByTestId } = render(<LoginForm />, { wrapper: BrowserRouter });

    const loginButton = await findByTestId("submit-button");
    const usernameInput = await findByTestId("username-input");
    const passwordInput = await findByTestId("password-input");

    await userEvent.type(usernameInput, "planatest");
    await userEvent.type(passwordInput, "123456");

    expect(loginButton).toBeEnabled();
  });

  test("Should not enable login button when login data is invalid", async () => {
    const { findByTestId } = render(<LoginForm />, { wrapper: BrowserRouter });

    const loginButton = await findByTestId("submit-button");
    const usernameInput = await findByTestId("username-input");
    const passwordInput = await findByTestId("password-input");

    await userEvent.type(usernameInput, "planatest");
    await userEvent.type(passwordInput, "12345");

    expect(loginButton).toBeDisabled();
  });
});
