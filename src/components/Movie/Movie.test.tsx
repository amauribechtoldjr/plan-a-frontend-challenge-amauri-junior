import "@testing-library/jest-dom";

import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { rest } from "msw";
import { setupServer } from "msw/node";

import Movie from "./Movie";

describe("Movie", () => {
  const server = setupServer(
    rest.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${
        import.meta.env.VITE_API_KEY
      }`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            original_title: "Original test title movie",
            overview:
              "Original test title overview, this is a original test overview, this is a original test overview.",
          })
        );
      }
    )
  );

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    server.close();
  });

  test("Should render component", async () => {
    const { getByText } = render(<Movie />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(getByText("Original test title movie")).toBeInTheDocument();
    });
  });
});
