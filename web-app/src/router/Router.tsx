import { createBrowserRouter } from 'react-router-dom';

import BoardPage from '~/pages/BoardPage';
import ErrorPage from '~/pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
    errorElement: <ErrorPage />
  }
]);
