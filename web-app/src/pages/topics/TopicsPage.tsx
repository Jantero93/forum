import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import TopicCard from './TopicCard';
import { BoardTopicsDto, TopicDto } from '~/data/apiTypes';
import env from '~/util/env';
import { useFetch } from '~/hooks/useFetch';
import NewPostForm from '../../components/NewPostForm';

const TopicsPage = () => {
  const [message, setMessage] = useState('');
  const [heading, setHeading] = useState('');

  const { name: boardName } = useParams();
  const navigate = useNavigate();

  const { data: response, sendRequest } = useFetch<BoardTopicsDto>(
    `${env.API_URL}/board?name=${boardName}`
  );

  const fetchConfig = {
    method: 'POST',
    payload: {
      message,
      heading,
      boardName
    }
  } as const;

  const { data: postResponse, sendRequest: postTopic } = useFetch<TopicDto>(
    `${env.API_URL}/topics/topic`,
    fetchConfig
  );

  // Force api call when route changes
  useEffect(() => {
    sendRequest();
  }, [boardName]);

  useEffect(() => {
    if (postResponse) {
      navigate(`${postResponse.id}`);
    }
  }, [postResponse]);

  const sendTopicClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    postTopic();
  };

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
          <NewPostForm
            msg={message}
            setMsg={setMessage}
            heading={heading}
            setHeading={setHeading}
            sendClicked={sendTopicClicked}
          />
        </div>
      </div>
    </NavbarLayout>
  );
};

export default TopicsPage;
