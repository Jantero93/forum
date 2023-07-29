import React from 'react';
import ReactDOM from 'react-dom/client';

// styles
import './index.css';
import { router } from './router/Router';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './contexts/AuthContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
