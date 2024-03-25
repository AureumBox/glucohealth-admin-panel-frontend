import { RouteObject } from 'react-router'

//customers
import Customers from 'views/customers'
import CreateCustomer from 'views/customers/create'
import EditCustomer from 'views/customers/edit'
//orders
import Orders from 'views/orders'

const ClienteleRoutes: RouteObject[] = [
  //customers
  {
    path: 'customers',
    element: <Customers />
  },
  {
    path: 'customers/create',
    element: <CreateCustomer />
  },
  {
    path: 'customers/edit/:id',
    element: <EditCustomer />
  },
  //orders
  {
    path: 'orders',
    element: <Orders />
  }
]

export default ClienteleRoutes
