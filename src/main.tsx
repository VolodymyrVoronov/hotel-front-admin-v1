import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import { ROUTES } from "./constants";
import RequireAuth from "./helpers/RequireAuth";

import AuthLayout from "./layout/AuthLayout/AuthLayout";
import AdminBoard from "./layout/AdminBoard/AdminBoard";

import Login from "./pages/Login/Login";

import Loader from "./components/Loader/Loader";

const Bookings = lazy(() => import("./pages/Bookings/Bookings"));
const Subscriptions = lazy(() => import("./pages/Subscriptions/Subscriptions"));
const Emails = lazy(() => import("./pages/Emails/Emails"));

import "./styles/custom.css";
import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: (
      <RequireAuth>
        <AdminBoard />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: (
          <Suspense fallback={<Loader />}>
            <Bookings />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ROOMS,
        element: <Suspense fallback={<Loader />}>Rooms</Suspense>,
      },
      {
        path: ROUTES.USERS,
        element: <Suspense fallback={<Loader />}>Users</Suspense>,
      },
      {
        path: ROUTES.REGISTER,
        element: <Suspense fallback={<Loader />}>Register</Suspense>,
      },
      {
        path: ROUTES.SUBSCRIPTIONS,
        element: (
          <Suspense fallback={<Loader />}>
            <Subscriptions />
          </Suspense>
        ),
      },
      {
        path: ROUTES.EMAILS,
        element: (
          <Suspense fallback={<Loader />}>
            <Emails />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <>404</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <RouterProvider router={router} />

      <ToastContainer />
    </SWRConfig>
  </React.StrictMode>
);

