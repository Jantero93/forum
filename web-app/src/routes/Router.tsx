import { createBrowserRouter } from 'react-router-dom';

import App from '~/App';
import ErrorPage from '~/pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ path: 'test', element: <div>MORON MORON TEST</div> }]
  }
]);
