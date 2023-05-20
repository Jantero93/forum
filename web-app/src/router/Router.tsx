import { createBrowserRouter } from 'react-router-dom';

import App from '~/App';
import ErrorPage from '~/pages/ErrorPage';

const Test = () => <div>MORON MORON</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'test',
        element: <Test />
      }
    ]
  }
]);
