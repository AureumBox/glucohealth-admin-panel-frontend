import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import { RouteObject } from 'react-router';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/pages/login',
      element: <AuthLogin />
    },
  ]
};

export default AuthenticationRoutes;
