import { createBrowserRouter } from 'react-router-dom';
import App from '~/App';

import BoardPage from '~/pages/board/BoardPage';
import ErrorPage from '~/pages/ErrorPage';
import SingleTopicPage from '~/pages/topic/SingleTopicPage';
import TopicsPage from '~/pages/topics/TopicsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
    ]
  }
]);
