import { RouteObject } from "react-router";

//hotels per night
import HotelsPerNight from "views/hotels-per-night";
import CreateCustomer from "views/hotels-per-night/create";
import EditCustomer from "views/hotels-per-night/edit";

const ServicesRoutes: RouteObject[] = [

  {
    path: "hotels-per-night",
    element: <HotelsPerNight />,
  },
  {
    path: "hotels-per-night/create",
    element: <CreateCustomer />,
  },
  {
    path: "hotels-per-night/edit/:id",
    element: <EditCustomer />,
  },
];

export default ServicesRoutes;
