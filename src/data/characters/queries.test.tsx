import {
  QueryClient,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getCharacters } from "./api";
import { useCharactersQuery } from "./queries";
import { CharacterDTO } from "../../types/authors.ts";
import { ReactNode } from "react";

const mockCharacters: CharacterDTO[] = [
  {
    id: "uuid1",
    name: "name",
    alignment: "chaotic"
  },
  {
    id: "uuid2",
    name: "name2",
    alignment: "loyal"
  },
];

vi.mock("./api", () => {
  return {
    getCharacters: vi.fn(),
  };
});
const getCharactersMock = vi.mocked(getCharacters);

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-query")>(
    "@tanstack/react-query",
  );
  return {
    ...actual,
    useQueryClient: vi.fn(),
  };
});

describe("Characters queries", () => {
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: ReactNode }) => ReactNode;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0,
        },
      },
    });
    vi.mocked(useQueryClient).mockReturnValue(queryClient);
    wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    queryClient.setQueryData(["characters"], mockCharacters);
  });

  afterEach(() => {
    queryClient.removeQueries();
    vi.clearAllMocks();
  });

  describe("useCharactersQuery", () => {
    it("returns characters", () => {
      const { result } = renderHook(() => useCharactersQuery(), { wrapper });

      expect(result.current.characters).toEqual(mockCharacters);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it("returns loading state when countries are still loading", () => {
      queryClient.clear(); // Cache should be clear before never resolving
      getCharactersMock.mockReturnValue(new Promise(() => {})); // Simulate a never-resolving promise

      const { result } = renderHook(() => useCharactersQuery(), { wrapper });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.characters).toEqual([]);
      expect(result.current.isError).toBe(false);
    });

    it("returns error state when the query fails", async () => {
      queryClient.clear(); // Cache should be clear before simulating an error
      getCharactersMock.mockRejectedValue(new Error("Network Error"));

      const { result } = renderHook(() => useCharactersQuery(), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.characters).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
