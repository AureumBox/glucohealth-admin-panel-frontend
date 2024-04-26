import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/Loadable";
import { RouteObject } from "react-router";

// pages
import Logout from "views/logout";
import HospitalRoutes from "./hospital-routes";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      element: <DashboardDefault />,
    },
    ...HospitalRoutes,
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default MainRoutes;
