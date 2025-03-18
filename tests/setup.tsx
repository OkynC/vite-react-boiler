// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  vi.setSystemTime(new Date("2025-01-01"));
});

afterEach(() => {
  vi.useRealTimers();
});

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  return {
    ...actual,
    default: {
      ...actual.default,
      create: ({ baseURL = "/api/", timeout = 60 * 1000 } = {}) => {
        return {
          ...actual.default.create({ baseURL, timeout }),
          get: async (path: string) => {
            console.error(`axios.get not mocked for path: ${path}`);
            throw new Error("axios error");
          },
          post: async (path: string) => {
            console.error(`axios.post not mocked for path: ${path}`);
            throw new Error("axios error");
          },
          put: async (path: string) => {
            console.error(`axios.put not mocked for path: ${path}`);
            throw new Error("axios error");
          },
          patch: async (path: string) => {
            console.error(`axios.patch not mocked for path: ${path}`);
            throw new Error("axios error");
          },
          delete: async (path: string) => {
            console.error(`axios.delete not mocked for path: ${path}`);
            throw new Error("axios error");
          },
        };
      },
    },
  };
});
