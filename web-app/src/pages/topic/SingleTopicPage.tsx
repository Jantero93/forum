import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { useAuthContext } from '~/contexts/AuthContextProvider';
import { TopicWithPostsDto, PostDto } from '~/data/apiTypes';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';
import NewPostForm from '../../components/NewPostForm';
import PostCard from './PostCard';

const SingleTopicPage = () => {
  const [msg, setMsg] = useState('');
  const [posts, setPosts] = useState<PostDto[]>([]);

  const { id } = useParams();
  const { authState } = useAuthContext();

  const newPostPayload = {
    message: msg,
    topicId: id
  } as const;

  const { sendRequest, data } = useFetch<PostDto>(`${env.API_URL}/posts`, {
    method: 'POST',
    payload: newPostPayload
  });

  const { data: topicResponse } = useFetch<TopicWithPostsDto>(
    `${env.API_URL}/topics/${id}`
  );

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, data]);
    }
  }, [data]);

  useEffect(() => {
    if (topicResponse) setPosts(topicResponse.posts);
  }, [topicResponse]);

  const sendPostClicked = async (e: React.MouseEvent) => {
    e.preventDefault();

    sendRequest();
  };

  // TODO: Handle no data situation
  if (!topicResponse) return <div>oh noes</div>;

  return (
    <NavbarLayout>
      <div className="flex justify-center">
        <div className="flex flex-col flex-grow max-w-screen-xl px-20 py-10 text-left rounded-lg bg-slate-800">
          <div
            id="topics-content"
            className="flex flex-col gap-5 text-left w-100 text-slate-900"
          >
            <h1 className="font-sans text-3xl font-bold bg-slate text-slate-200">
              {topicResponse?.header}
            </h1>
            <PostCard
              key={topicResponse.id}
              createdTime={topicResponse.createdTime}
              message={topicResponse.message}
              user={topicResponse.creator}
              votes={topicResponse.votes}
            />
            {posts.map(({ id, user, createdTime, message, votes }) => (
              <PostCard
                key={id}
                createdTime={createdTime}
                message={message}
                user={user}
                votes={votes}
              />
            ))}
            {authState.isLogged && (
              <NewPostForm
                msg={msg}
                setMsg={setMsg}
                sendClicked={sendPostClicked}
              />
            )}
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default SingleTopicPage;
