import { createBrowserRouter } from 'react-router-dom';

import App from '~/App';

const Test = () => <div>MORON MORON</div>;
const ErrorPage = () => (
  <p className="flex justify-center text-3xl mt-5">NOT FOUND 404</p>
);

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
