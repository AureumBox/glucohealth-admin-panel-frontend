import { RouteObject } from "react-router";

//hotels per night
import HotelsPerNight from "views/hotels-per-night";
import CreateHotelPerNight from "views/hotels-per-night/create";
import EditHotelPerNight from "views/hotels-per-night/edit";
//packages
import PackagesPage from "views/packages";
import CreatePackage from "views/packages/create";
import EditPackage from "views/packages/edit";
//staff
import StaffPage from "views/staff";
import CreateStaffPage from "views/staff/create";
import EditStaffPage from "views/staff/edit";

const ServicesRoutes: RouteObject[] = [
  {
    path: "hotels-per-night",
    element: <HotelsPerNight />,
  },
  {
    path: "hotels-per-night/create",
    element: <CreateHotelPerNight />,
  },
  {
    path: "hotels-per-night/edit/:id",
    element: <EditHotelPerNight />,
  },
  {
    path: "packages",
    element: <PackagesPage />,
  },
  {
    path: "packages/create",
    element: <CreatePackage />,
  },
  {
    path: "packages/edit/:id",
    element: <EditPackage />,
  },
  {
    path: "staff",
    element: <StaffPage />,
  },
  {
    path: "staff/create",
    element: <CreateStaffPage />,
  },
  {
    path: "staff/edit/:id",
    element: <EditStaffPage />,
  },
];

export default ServicesRoutes;
