import { RouteObject } from 'react-router'

//nurses

import Nurses from 'views/nurses'
import CreateNurse from 'views/nurses/create'
import EditNurse from 'views/nurses/edit'
//orders
import Orders from 'views/orders'

const HospitalRoutes: RouteObject[] = [
  {
    path: 'nurses',
    element: <Nurses />
  },
  {
    path: 'nurses/create',
    element: <CreateNurse />
  },
  {
    path: 'nurses/edit/:id',
    element: <EditNurse />
  },
]

export default HospitalRoutes
