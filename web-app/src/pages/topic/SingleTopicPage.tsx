import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';
import { useAuthContext } from '~/contexts/AuthContextProvider';
import { TopicWithPostsDto, PostDto } from '~/data/apiTypes';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';
import NewPostForm from '../../components/NewPostForm';
import PostCard from './PostCard';
import { toast as sendToast } from 'react-toastify';

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
    topicId: topicIdFromUrl
  } as const;

  const { sendRequest, data } = useFetch<PostDto>(`${env.API_URL}/posts`, {
    method: 'POST',
    payload: newPostPayload
  });

  const { data: topicResponse } = useFetch<TopicWithPostsDto>(
    `${env.API_URL}/topics/${topicIdFromUrl}`
  );

  const { data: deleteResponse, sendRequest: deletePostRequest } =
    useFetch<DeleteResponse>(`${env.API_URL}/posts/${clickedDeletePost}`, {
      method: 'DELETE'
    });

  const getPutPayload = (): PostDto | undefined => {
    const oldPost = posts.find((p) => p.id === clickedEditedPost);
    if (!oldPost) return undefined;

    return { ...oldPost, message: editMsg };
  };

  const {
    data: putResponse,
    sendRequest: putPostRequest,
    nullApiResponse: nullPutPostResponse
  } = useFetch<PostDto>(`${env.API_URL}/posts/${clickedEditedPost}`, {
    method: 'PUT',
    payload: getPutPayload()
  });

  // Update components posts if creating new post is successful
  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, data]);
    }
  }, [data]);

  // Update voted post count if voting post reqeust is successful
  useEffect(() => {
    if (!responseVotedDto) {
      return;
    }

    const updateNewPost = (prevPosts: PostDto[]) =>
      prevPosts.map((oldPost) =>
        oldPost.id === responseVotedDto.id ? responseVotedDto : oldPost
      );

    setPosts(updateNewPost);
  }, [responseVotedDto]);

  // Update posts if delete post is successful
  useEffect(() => {
    if (!deleteResponse) {
      return;
    }

    const { postId: deletedPostId } = deleteResponse;

    const updateNewPosts = (prevPosts: PostDto[]) =>
      prevPosts.filter((post) => post.id !== deletedPostId);

    setPosts(updateNewPosts);
    setClickedDeletePost(null);
    sendToast.success('Successfully deleted post');
  }, [deleteResponse]);

  // Update updated post if put request is successful
  useEffect(() => {
    if (!putResponse) {
      return;
    }

    const updateModifiedPost = (prevPosts: PostDto[]) =>
      prevPosts.map((oldPost) =>
        putResponse.id === oldPost.id ? putResponse : oldPost
      );

    setPosts(updateModifiedPost);
    setSendPutRequest(false);
    sendToast.success('Successfully updated post');
    setEditMsg('');
    nullPutPostResponse();
  }, [putResponse, nullPutPostResponse]);

  // Render new posts if topic changes
  useEffect(() => {
    if (topicResponse) setPosts(topicResponse.posts);
  }, [topicResponse]);

  const sendPostClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    sendRequest();
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
    if (clickedUpVotePost === null) {
      return;
    }

    postVoteRequest();
    setClickedUpVotePost(null);
  }, [clickedUpVotePost, postVoteRequest, sendVotePostRequest]);

  // Clicked delete post
  useEffect(() => {
    if (clickedDeletePost === null) {
      return;
    }

    deletePostRequest();
    setClickedDeletePost(null);
  }, [clickedDeletePost, deletePostRequest]);

  // Clicked edit message send request
  useEffect(() => {
    if (clickedEditedPost === null || !sendPutRequest) {
      return;
    }

    putPostRequest();
    setClickedEditedPost(null);
  }, [clickedEditedPost, putPostRequest, sendPutRequest]);

  // Vote error response from api
  useEffect(() => {
    if (!voteResponseError || voteResponseError === '') {
      return;
    }

    // Trying vote without authentication
    if (voteResStatusCode === 403 && !authState.isLogged) {
      sendToast.error('You have to be logged in to vote posts');
      nullVoteResponseError();
      return;
    }

    // Voted already
    if (voteResStatusCode === 400 && authState.isLogged) {
      sendToast.error('You have already voted this post');
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
