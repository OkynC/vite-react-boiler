import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import { getRouter } from "./router.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={getRouter(queryClient)} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
