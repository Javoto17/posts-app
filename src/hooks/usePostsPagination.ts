import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { AppContext } from "@/context/app.context";

import PostsService from "@/services/posts.service";
import { AxiosError } from "axios";

function usePostsPagination(itemsPerPage: number) {
  const { addPosts, posts } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data, status } = await PostsService.all(
          itemsPerPage,
          currentPage >= 1 ? itemsPerPage * currentPage : 0
        );

        if (status !== 200) {
          throw Error("Error fetching data");
        }

        addPosts(data.posts);

        setTotalItems(data?.total);
      } catch (error) {
        console.error("Error fetching posts:", error);
        if (error instanceof AxiosError) {
          setError(error?.message);
        }

        setError(error as string);
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

  return { posts, isLastPage, fetchNextPage, isLoading, error } as const;
}

export default usePostsPagination;
