import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { AppContext } from '@/context/app.context';

import PostsService from '@/services/posts.service';

function usePostsPagination(itemsPerPage: number) {
  const { addPosts, posts } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data, status } = await PostsService.all(
          itemsPerPage,
          currentPage >= 1 ? itemsPerPage * currentPage : 0
        );

        if (status !== 200) {
          throw Error('Error fetching data');
        }

        addPosts(data.posts);

        setTotalItems(data?.total);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, itemsPerPage]);

  const isLastPage = useMemo(() => {
    return posts?.length >= totalItems;
  }, [posts, totalItems]);

  const fetchNextPage = useCallback(() => {
    if (!isLastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [isLastPage]);

  return { posts, isLastPage, fetchNextPage, isLoading } as const;
}

export default usePostsPagination;
