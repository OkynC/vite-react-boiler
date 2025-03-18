import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { getCharacters } from "../../data/characters/api.ts";
import { CharacterDTO } from "../../types/authors.ts";
import { queryClientHelper, renderWithRouter } from "../tests/helpers.tsx";
import Home from "./Home";

vi.mock("@/data/characters/api");

const getCharactersMock = vi.mocked(getCharacters);

const fakeCharacters: CharacterDTO[] = [
  {
    id: "uuid1",
    name: "Toto",
    alignment: "loyal",
  },
  {
    id: "uuid2",
    name: "Tutu",
    alignment: "chaotic",
  },
];

describe("Home", () => {
  beforeEach(() => {
    queryClientHelper.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    renderWithRouter({
      element: <Home />,
      path: "/",
    });

  it("should display component", async () => {
    getCharactersMock.mockResolvedValue(fakeCharacters);
    renderComponent();
    expect(await screen.findByText("Hello User")).toBeVisible();
  });

  it("should show an error if query is in error", async () => {
    getCharactersMock.mockRejectedValue({});
    renderComponent();
    expect(
      await screen.findByText("Error while fetching characters"),
    ).toBeVisible();
  });

  it("should display a loading message if required", async () => {
    getCharactersMock.mockReturnValue(new Promise(() => {})); // Simulate a never-resolving promise
    renderComponent();
    expect(await screen.findByText("Loading characters")).toBeVisible();
  });
});
