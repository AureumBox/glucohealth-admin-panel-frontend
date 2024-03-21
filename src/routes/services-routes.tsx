import { RouteObject } from 'react-router'

//hotels per night
import HotelsPerNight from 'views/hotels-per-night'
import CreateHotelPerNight from 'views/hotels-per-night/create'
import EditHotelPerNight from 'views/hotels-per-night/edit'
//car rentals
import CarRentals from 'views/car-rentals'
//airline tickets
import AirlineTickets from 'views/airline-tickets'
//train tickets
import TrainTickets from 'views/train-tickets'
//bus tickets
import BusTickets from 'views/bus-tickets'
//tours
import Tours from 'views/tours'
//events
import Events from 'views/events'
//packages
import PackagesPage from 'views/packages'
import CreatePackage from 'views/packages/create'
import EditPackage from 'views/packages/edit'
//staff
import StaffPage from 'views/staff'
import CreateStaffPage from 'views/staff/create'
import EditStaffPage from 'views/staff/edit'

const ServicesRoutes: RouteObject[] = [
  //hotels per night
  {
    path: 'hotels-per-night',
    element: <HotelsPerNight />
  },
  {
    path: 'hotels-per-night/create',
    element: <CreateHotelPerNight />
  },
  {
    path: 'hotels-per-night/edit/:id',
    element: <EditHotelPerNight />
  },
  //car rentals
  {
    path: 'car-rentals',
    element: <CarRentals />
  },
  // {
  //   path: 'hotels-per-night/create',
  //   element: <CreateHotelPerNight />
  // },
  // {
  //   path: 'hotels-per-night/edit/:id',
  //   element: <EditHotelPerNight />
  // },
  //airline tickets
  {
    path: 'airline-tickets',
    element: <AirlineTickets />
  },
  // {
  //   path: 'hotels-per-night/create',
  //   element: <CreateHotelPerNight />
  // },
  // {
  //   path: 'hotels-per-night/edit/:id',
  //   element: <EditHotelPerNight />
  // },
  //train tickets
  {
    path: 'train-tickets',
    element: <TrainTickets />
  },
  // {
  //   path: 'hotels-per-night/create',
  //   element: <CreateHotelPerNight />
  // },
  // {
  //   path: 'hotels-per-night/edit/:id',
  //   element: <EditHotelPerNight />
  // },
  //bus tickets
  {
    path: 'bus-tickets',
    element: <BusTickets />
  },
  // {
  //   path: 'hotels-per-night/create',
  //   element: <CreateHotelPerNight />
  // },
  // {
  //   path: 'hotels-per-night/edit/:id',
  //   element: <EditHotelPerNight />
  // },
  //tours
  {
    path: 'tours',
    element: <Tours />
  },
  // {
  //   path: 'hotels-per-night/create',
  //   element: <CreateHotelPerNight />
  // },
  // {
  //   path: 'hotels-per-night/edit/:id',
  //   element: <EditHotelPerNight />
  // },
  //events
  {
    path: 'events',
    element: <Events />
  },
  // {
  //   path: 'hotels-per-night/create',
  //   element: <CreateHotelPerNight />
  // },
  // {
  //   path: 'hotels-per-night/edit/:id',
  //   element: <EditHotelPerNight />
  // },
  //packages
  {
    path: 'packages',
    element: <PackagesPage />
  },
  {
    path: 'packages/create',
    element: <CreatePackage />
  },
  {
    path: 'packages/edit/:id',
    element: <EditPackage />
  },
  //staff
  {
    path: 'staff',
    element: <StaffPage />
  },
  {
    path: 'staff/create',
    element: <CreateStaffPage />
  },
  {
    path: 'staff/edit/:id',
    element: <EditStaffPage />
  }
]

export default ServicesRoutes
