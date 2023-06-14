import React from 'react';
import { useParams } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { TopicWithPostsDto } from '~/data/apiTypes';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';
import PostCard from './PostCard';

const SingleTopicPage = () => {
  const { id } = useParams();

  const { response } = useFetch<TopicWithPostsDto>(
    `${env.API_URL}/topics/${id}`,
    'GET'
  );

  // TODO: Handle no data situation
  if (!response) return <div>oh noes</div>;

  return (
    <NavbarLayout>
      <div className="flex justify-center">
        <div className="flex flex-col flex-grow max-w-screen-xl text-left rounded-lg bg-slate-800">
          <div
            id="topic-content"
            className="flex flex-col gap-6 px-20 py-5 text-left w-100 text-slate-900"
          >
            <h1 className="font-sans text-3xl font-bold bg-slate text-slate-200">
              {response?.header}
            </h1>
            <PostCard
              createdTime={response.createdTime}
              message={response.message}
              user={response.creator}
              votes={response.votes}
            />
            {response?.posts.map(
              ({ id, user, createdTime, message, votes }) => (
                <PostCard
                  key={id}
                  createdTime={createdTime}
                  message={message}
                  user={user}
                  votes={votes}
                />
              )
            )}
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default SingleTopicPage;
