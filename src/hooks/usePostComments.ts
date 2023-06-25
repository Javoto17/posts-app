import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import PostsService from '@/services/posts.service';

import { Comment } from '@/models/comment';

function usePostComments(postId: number | null) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPostsComments(postId: number | null) {
      if (!postId) return;

      try {
        setLoading(true);

        const { data: response, status } = await PostsService.getComments(
          postId
        );

        if (status !== 200) {
          throw Error('Error on try to get comments');
        }

        setData(response?.comments);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          setError(e?.message);
        }

        setError(e as string);
      } finally {
        // Fake delay to show loading message
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }

    fetchPostsComments(postId);
  }, [postId]);

  return {
    isLoading,
    data,
    error,
  } as const;
}

export default usePostComments;
