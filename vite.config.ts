import react from "@vitejs/plugin-react";
import * as path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vitest/config";

let devConfig = {};
if (process.env.NODE_ENV === "development") {
  console.log("Development mode detected.");
  devConfig = {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./tests/setup.tsx",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
    server: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ...devConfig,
});
