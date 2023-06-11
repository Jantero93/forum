import { useLocation } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';

type TopicPageLocationState = {
  boardId: number;
  boardName: string;
};

const TopicPage = () => {
  const location = useLocation();
  const { boardId, boardName } = location.state as TopicPageLocationState;

  const { response } = useFetch(`${env.API_URL}/board?id=${boardId}`, 'GET');

  return (
    <NavbarLayout>
      <div className="text-slate-900">
        <p>Test</p>
        <p>{boardId}</p>
        <p>{boardName}</p>
      </div>
    </NavbarLayout>
  );
};

export default TopicPage;
