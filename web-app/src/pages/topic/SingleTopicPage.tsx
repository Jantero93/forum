import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { useAuthContext } from '~/contexts/AuthContextProvider';
import { TopicWithPostsDto, PostDto } from '~/data/apiTypes';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';
import NewPostForm from '~/components/NewPostForm';
import PostCard from '~/pages/topic/PostCard';
import useApiRequest from '~/hooks/useApiRequest';
import useUpdatePosts from '~/hooks/useUpdatePosts';

type DeleteResponse = { message: string; postId: number };

const SingleTopicPage = () => {
  const [msg, setMsg] = useState('');
  const [editMsg, setEditMsg] = useState('');
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [clickedUpVotePost, setClickedUpVotePost] = useState<number | null>(
    null
  );
  const [clickedDeletePost, setClickedDeletePost] = useState<number | null>(
    null
  );
  const [clickedEditedPost, setClickedEditedPost] = useState<number | null>(
    null
  );
  const [sendPutRequest, setSendPutRequest] = useState(false);

  const { id: topicIdFromUrl } = useParams();
  const { authState } = useAuthContext();

  const voteUrl = `${env.API_URL}/posts/${clickedUpVotePost}/vote` as const;
  const votePost = useApiRequest<PostDto>(voteUrl, { method: 'POST' });

  const newPostPayload = {
    message: msg,
    topicId: topicIdFromUrl
  } as const;

  const createPost = useApiRequest<PostDto>(`${env.API_URL}/posts`, {
    method: 'POST',
    payload: newPostPayload
  });

  const deletePost = useApiRequest<DeleteResponse>(
    `${env.API_URL}/posts/${clickedDeletePost}`,
    {
      method: 'DELETE',
      payload: newPostPayload
    }
  );

  const getPutPayload = (): PostDto | undefined => {
    const oldPost = posts.find((p) => p.id === clickedEditedPost);
    if (!oldPost) return undefined;

    return { ...oldPost, message: editMsg };
  };

  const putPost = useApiRequest<PostDto>(
    `${env.API_URL}/posts/${clickedEditedPost}`,
    {
      method: 'PUT',
      payload: getPutPayload()
    }
  );

  useUpdatePosts(createPost.responseData, 'ADD', setPosts);
  useUpdatePosts(deletePost.responseData?.postId ?? null, 'DELETE', setPosts);
  useUpdatePosts(putPost.responseData, 'UPDATE', setPosts);
  useUpdatePosts(votePost.responseData, 'UPDATE', setPosts);

  const { data: topicResponse } = useFetch<TopicWithPostsDto>(
    `${env.API_URL}/topics/${topicIdFromUrl}`
  );

  // Update updated post if put request is successful
  useEffect(() => {
    if (clickedEditedPost === null) {
      setEditMsg('');
    }

    setSendPutRequest(false);
  }, [clickedEditedPost]);

  // Render new posts if topic changes
  useEffect(() => {
    if (topicResponse) setPosts(topicResponse.posts);
  }, [topicResponse]);

  const sendPostClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    createPost.sendRequest();
  };

  const sendVotePostRequest = useCallback((postId: number) => {
    if (postId === null) return;

    setClickedUpVotePost(postId);
  }, []);

  // Update posts after deleting
  const sendDeletePostRequest = (postId: number) => {
    if (postId === null) return;

    setClickedDeletePost(postId);
  };

  // Clicked up vote for post
  useEffect(() => {
    const noVotedPostOrUrlNull =
      clickedUpVotePost === null || voteUrl.includes('null');
    if (noVotedPostOrUrlNull) {
      return;
    }

    votePost.sendRequest();
    setClickedUpVotePost(null);
  }, [clickedUpVotePost, votePost, voteUrl]);

  // Clicked delete post
  useEffect(() => {
    if (clickedDeletePost === null) {
      return;
    }

    deletePost.sendRequest();
    setClickedDeletePost(null);
  }, [clickedDeletePost, deletePost]);

  // Clicked edit message send request
  useEffect(() => {
    if (clickedEditedPost === null || !sendPutRequest) {
      return;
    }

    putPost.sendRequest();
    setClickedEditedPost(null);
  }, [clickedEditedPost, sendPutRequest, putPost]);

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
                sendDeletePostRequest={sendDeletePostRequest}
              />
            </div>
            {posts.map(({ id, user, createdTime, message, votes, userId }) => (
              <PostCard
                key={id}
                postId={id}
                createdTime={createdTime}
                message={message}
                user={user}
                votes={votes}
                sendVotePostRequest={sendVotePostRequest}
                sendDeletePostRequest={sendDeletePostRequest}
                postsUserId={userId}
                editMessage={editMsg}
                setEditMessage={setEditMsg}
                clickedEditedPost={clickedEditedPost}
                setClickedEditedPost={setClickedEditedPost}
                setSendPutRequest={setSendPutRequest}
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
