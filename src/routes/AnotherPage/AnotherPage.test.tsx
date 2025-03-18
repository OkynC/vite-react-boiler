import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { queryClientHelper, renderWithRouter } from "../tests/helpers.tsx";
import AnotherPage from "./AnotherPage.tsx";

describe("Home", () => {
  beforeEach(() => {});

  afterEach(() => {
    queryClientHelper.clear();
  });

  const renderComponent = () =>
    renderWithRouter({
      element: <AnotherPage />,
      path: "/",
    });

  it("should display component", async () => {
    renderComponent();
    expect(await screen.findByText("Hello User")).toBeVisible();
    expect(await screen.findByText("This is another page")).toBeVisible();
  });
});
