import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { TopicWithPostsDto, PostDto } from '~/data/apiTypes';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';
import NewPostForm from './NewPostForm';
import PostCard from './PostCard';

const SingleTopicPage = () => {
  const [msg, setMsg] = useState('');

  const { id } = useParams();

  const { response } = useFetch<TopicWithPostsDto>(
    `${env.API_URL}/topics/${id}`,
    'GET'
  );

  const [posts, setPosts] = useState<PostDto[]>(response?.posts ?? []);

  const newPostPayload = {
    message: msg,
    topicId: id
  } as const;

  const { response: postResponse, callApi } = useFetch<PostDto>(
    env.API_URL + '/post',
    'POST',
    newPostPayload,
    false
  );

  console.log('postResponse', postResponse);

  const sendPostClicked = (e: React.MouseEvent) => {
    console.log('moro');
    e.preventDefault();
    callApi();

    postResponse && setPosts([...posts, postResponse]);
  };

  // TODO: Handle no data situation
  if (!response) return <div>oh noes</div>;

  return (
    <NavbarLayout>
      <div className="flex justify-center">
        <div className="flex flex-col flex-grow max-w-screen-xl px-20 py-10 text-left rounded-lg bg-slate-800">
          <div
            id="topics-content"
            className="flex flex-col gap-5 text-left w-100 text-slate-900"
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
            <NewPostForm
              msg={msg}
              setMsg={setMsg}
              sendPostClicked={sendPostClicked}
            />
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default SingleTopicPage;
