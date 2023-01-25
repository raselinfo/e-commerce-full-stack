import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = lazy(() => import('../App'));
const NotFound = lazy(() => import('../views/NotFound/NotFound'));
export const routesConfig = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/banana',
    element: <h1>banana page</h1>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const routes = createBrowserRouter(routesConfig);

export default routes;
