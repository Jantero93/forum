import { createBrowserRouter } from 'react-router-dom';

import BoardPage from '~/pages/board/BoardPage';
import ErrorPage from '~/pages/ErrorPage';
import SingleTopicPage from '~/pages/topic/SingleTopicPage';
import TopicsPage from '~/pages/topic/TopicsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/:name',
    element: <TopicsPage />
  },
  {
    path: '/:name/:id',
    element: <SingleTopicPage />
  }
]);
