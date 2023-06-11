import { createBrowserRouter } from 'react-router-dom';

import BoardPage from '~/pages/board/BoardPage';
import ErrorPage from '~/pages/ErrorPage';
import TopicPage from '~/pages/topic/TopicPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/:name',
    element: <TopicPage />
  }
]);
