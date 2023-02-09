import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('../components/Layout/Layout'));
const Login = lazy(() => import('../views/Login/Login'));
const NotFound = lazy(() => import('../views/NotFound/NotFound'));
const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
export const routesConfig = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'app',
        element: <h1>Hello App</h1>,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
];

const routes = createBrowserRouter(routesConfig);

export default routes;
