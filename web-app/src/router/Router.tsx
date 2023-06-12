import { createBrowserRouter } from 'react-router-dom';

import BoardPage from '~/pages/board/BoardPage';
import ErrorPage from '~/pages/ErrorPage';
import TopicsPage from '~/pages/topic/TopicsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/:name',
    element: <TopicsPage key={document.location.href} />
  },
  {
    path: '/:name/:id',
    element: <div>topic holder</div>
  }
]);
