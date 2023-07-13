import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import TopicCard from './TopicCard';
import { BoardTopicsDto } from '~/data/apiTypes';
import env from '~/util/env';
import { useFetch } from '~/hooks/useFetch';

const TopicsPage = () => {
  const { name } = useParams();

  const { data: response, sendRequest } = useFetch<BoardTopicsDto>(
    `${env.API_URL}/board?name=${name}`
  );

  // Force api call when route changes
  useEffect(() => {
    sendRequest();
  }, [name]);

  return (
    <NavbarLayout>
      <div className="flex justify-center flex-grow">
        <div className="flex flex-col flex-grow max-w-screen-xl text-left w-100 text-slate-900">
          <header>
            <h1 className="font-sans text-3xl font-bold text-slate-200">
              {response?.name}
            </h1>
            <p className="font-serif text-xl text-slate-400">
              {response?.adjective}
            </p>
          </header>
          <div id="topic-content" className="flex flex-col gap-5 mt-5">
            {response?.topics.map(
              ({ createdTime, creator, header, id, message }) => (
                <TopicCard
                  key={id}
                  topicId={id}
                  createdTime={createdTime}
                  creator={creator}
                  header={header}
                  message={message}
                />
              )
            )}
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default TopicsPage;
