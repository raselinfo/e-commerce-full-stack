import { RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import routes from './routes';
import './index.css';
import store from './store';
import ThemeProvider from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Redux Provider 🔽 */}
    <Provider store={store}>
      <ThemeProvider>
        {/* Theme Provider 🔽 */}
        <RouterProvider router={routes} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
