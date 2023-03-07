import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import App from "./App";

describe("App", () => {
  test("Should be able to see the login page", () => {
    const { getByText } = render(<App />, { wrapper: BrowserRouter });

    expect(getByText("Username")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });
});
