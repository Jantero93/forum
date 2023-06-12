import { useLocation } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';

export type TopicPageLocationState = {
  boardId: number;
  boardName: string;
  description: string;
};

const TopicPage = () => {
  const location = useLocation();
  const { boardId, boardName, description } =
    location.state as TopicPageLocationState;

  const { response } = useFetch(`${env.API_URL}/board?id=${boardId}`, 'GET');

  console.log('response', response);

  return (
    <NavbarLayout>
      <div className="flex justify-center flex-grow">
        <div className="flex flex-col flex-grow max-w-screen-xl text-left w-100 text-slate-900">
          <header>
            <h1 className="font-sans text-3xl font-bold text-slate-200">
              {boardName}
            </h1>
            <p className="font-serif text-xl text-slate-400">{description}</p>
          </header>
          <p>Test</p>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default TopicPage;
