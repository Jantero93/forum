import { useEffect } from 'react';
import { PostDto } from '~/data/apiTypes';
import { toast as sendToast } from 'react-toastify';

type PostModificationType = 'ADD' | 'UPDATE' | 'DELETE';

const useUpdatePosts = (
  postDto: PostDto | number | null,
  modificationType: PostModificationType,
  setPosts: React.Dispatch<React.SetStateAction<PostDto[]>>
) => {
  useEffect(() => {
    const updatePosts = (updatedPost: PostDto) =>
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );

    const addPost = (newPost: PostDto) =>
      setPosts((prevPosts) => prevPosts.concat(newPost));

    const deletePost = (deletedPostId: number) => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== deletedPostId)
      );
      sendToast.success('Successfully deleted post');
    };

    if (!postDto) {
      return;
    }

    switch (modificationType) {
      case 'ADD':
        typeof postDto !== 'number' && addPost(postDto);
        return;

      case 'UPDATE':
        typeof postDto !== 'number' && updatePosts(postDto);
        return;

      case 'DELETE':
        typeof postDto === 'number' && deletePost(postDto);
        return;

      default:
        return;
    }
  }, [postDto, modificationType, setPosts]);
};

export default useUpdatePosts;
