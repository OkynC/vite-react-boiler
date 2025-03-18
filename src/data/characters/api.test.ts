import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCharacters } from "./api.ts";


const mocks = vi.hoisted(() => ({
  get: vi.fn().mockResolvedValue({
    data: [
      {
        id: "uuid1",
        name: "Toto",
        alignment: "chaotic"
      },
    ],
  }),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
      })),
    },
  };

  return mockAxios;
});

describe("characters api", () => {
  beforeEach(() => {
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getCharacters", () => {
    it("should call the client with the correct parameters", async () => {
      await getCharacters();
      expect(mocks.get).toHaveBeenCalledWith("/api/characters");
    });
  });
});
