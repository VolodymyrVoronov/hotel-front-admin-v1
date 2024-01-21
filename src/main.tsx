import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import { ROUTES } from "./constants";
import RequireAuth from "./helpers/RequireAuth";

import AuthLayout from "./layout/AuthLayout/AuthLayout";
import AdminBoard from "./layout/AdminBoard/AdminBoard";

import Login from "./pages/Login/Login";

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
        path: "/booking",
        element: <div>Booking</div>,
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

