import { RouteObject } from 'react-router'

//nurses

import Nurses from 'views/nurses'
import CreateNurse from 'views/nurses/create'
import EditNurse from 'views/nurses/edit'

import Patients from 'views/patients'
import CreatePatient from 'views/patients/create'
import EditPatient from 'views/patients/edit'
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
  {
    path: 'patients',
    element: <Patients />
  },
  {
    path: 'patients/create',
    element: <CreatePatient />
  },
  {
    path: 'patients/edit/:id',
    element: <EditPatient />
  },
]

export default HospitalRoutes
