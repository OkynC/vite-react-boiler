import { ReactElement, isValidElement } from "react";
import {
  Outlet,
  RouteObject,
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const queryClientHelper = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export { queryClientHelper };

export function renderWithRouter(
  children: ReactElement | RouteObject,
  routes: RouteObject[] = [],
) {
  const route = isValidElement(children)
    ? { element: children, path: "/" }
    : (children as RouteObject);

  function LocationWrapper() {
    return (
      <>
        <LocationDisplay />
        <Outlet />
      </>
    );
  }
  function LocationDisplay() {
    const { pathname, search } = useLocation();
    return <pre data-testid="location-display">{pathname + search}</pre>;
  }

  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <LocationWrapper />,
        children: [route, ...routes],
      },
    ] as RouteObject[],
    {
      initialEntries: [route.path ?? "/"],
      initialIndex: 1,
    },
  );

  return render(
    <QueryClientProvider client={queryClientHelper}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
