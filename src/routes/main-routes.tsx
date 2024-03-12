import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/Loadable";
import { RouteObject } from "react-router";

// pages
import Logout from "views/logout";
import CompanyRoutes from "./company-routes";
import ClienteleRoutes from "./clientele-routes";
import ServicesRoutes from "./services-routes";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

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
    {
      path: "sample-page",
      element: <SamplePage />,
    },
    ...ClienteleRoutes,
    ...ServicesRoutes,
    ...CompanyRoutes,
    {
      path: "logout",
      element: <Logout />,
    },
  ],
};

export default MainRoutes;
