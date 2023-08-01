import React, { useCallback, useEffect, useState } from 'react';
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
  const [clickedUpVotePost, setClickedUpVotePost] = useState<number | null>(
    null
  );

  const { id } = useParams();
  const { authState } = useAuthContext();

  const voteUrl = `${env.API_URL}/posts/${
    clickedUpVotePost ?? -1
  }/vote` as const;

  const fetchConfig = { method: 'POST' } as const;
  const {
    data: responseVotedDto,
    error: voteResponseError,
    sendRequest: postVoteRequest,
    nullResponseError: nullVoteResponseError,
    statusCode: voteResStatusCode
  } = useFetch<PostDto>(voteUrl, fetchConfig);

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
    if (!responseVotedDto) return;

    const updateNewPost = (prevPosts: PostDto[]) =>
      prevPosts.map((oldPost) =>
        oldPost.id === responseVotedDto.id ? responseVotedDto : oldPost
      );

    setPosts(updateNewPost);
  }, [responseVotedDto]);

  useEffect(() => {
    if (topicResponse) setPosts(topicResponse.posts);
  }, [topicResponse]);

  const sendPostClicked = async (e: React.MouseEvent) => {
    e.preventDefault();

    sendRequest();
  };

  const sendVotePostRequest = useCallback((postId: number) => {
    if (postId === null) return;

    setClickedUpVotePost(postId);
  }, []);

  useEffect(() => {
    if (clickedUpVotePost === null) {
      return;
    }
    postVoteRequest();
    setClickedUpVotePost(null);
  }, [clickedUpVotePost, postVoteRequest, sendVotePostRequest]);

  useEffect(() => {
    if (!voteResponseError || voteResponseError === '') {
      return;
    }
    if (voteResStatusCode === 403 && !authState.isLogged) {
      alert('You have to be logged in to vote posts');
      nullVoteResponseError();
      return;
    }
    if (voteResStatusCode === 400 && authState.isLogged) {
      alert('You have already voted this post');
      nullVoteResponseError();
    }
  }, [
    voteResponseError,
    nullVoteResponseError,
    voteResStatusCode,
    authState.isLogged
  ]);

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
            <div className="pb-5" id="topic-first-post-container">
              <PostCard
                votes={topicResponse.id}
                key={topicResponse.id}
                createdTime={topicResponse.createdTime}
                message={topicResponse.message}
                user={topicResponse.creator}
                sendVotePostRequest={sendVotePostRequest}
              />
            </div>
            {posts.map(({ id, user, createdTime, message, votes }) => (
              <PostCard
                key={id}
                postId={id}
                createdTime={createdTime}
                message={message}
                user={user}
                votes={votes}
                sendVotePostRequest={sendVotePostRequest}
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
