// project imports
import { RouteObject } from "react-router";

//customers
import Customers from "views/customers";
import CreateCustomer from "views/customers/create";
import EditCustomer from "views/customers/edit";

const ClienteleRoutes: RouteObject[] = [
  // Estados
  {
    path: "customers",
    element: <Customers />,
  },
  {
    path: "customers/create",
    element: <CreateCustomer />,
  },
  {
    path: "customers/edit/:id",
    element: <EditCustomer />,
  },
];

export default ClienteleRoutes;
