import { createBrowserRouter, RouteObject } from "react-router-dom";

import { QueryClient } from "@tanstack/react-query";

import AnotherPage from "./routes/AnotherPage/AnotherPage";
import Home from "./routes/Home/Home";

export const getRoutes = (_queryClient: QueryClient): RouteObject[] => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/another-page",
    element: <AnotherPage />,
  },
];

export const getRouter = (queryClient: QueryClient) =>
  createBrowserRouter(getRoutes(queryClient));
