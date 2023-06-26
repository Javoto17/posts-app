import { useContext, MouseEvent, useCallback } from "react";

import PostCard from "@/components/PostCard";
import PostList from "@/components/PostList";

import { Post } from "@/models/post";

import usePostsPagination from "../hooks/usePostsPagination";
import { AppContext } from "@/context/app.context";

export default function Home() {
  const { toggleFavorite: setFavorite, openModal } = useContext(AppContext);
  const { posts, fetchNextPage, isLoading, isLastPage, error } =
    usePostsPagination(30);

  const toggleFavorite = (
    ev: MouseEvent<HTMLButtonElement>,
    id: number,
    value: boolean
  ) => {
    ev?.preventDefault();

    setFavorite(id, !value);
  };

  const onClick = useCallback((post: Post) => {
    openModal(post);
  }, []);

  return (
    <div className="container mx-auto">
      <PostList
        data={posts}
        isLoading={isLoading}
        isLimitReached={isLastPage}
        error={error}
        onReachedLimit={() => {
          fetchNextPage();
        }}
        renderItem={(post, i) => {
          return (
            <PostCard
              post={post}
              toggleFavorite={(ev) =>
                toggleFavorite(ev, post.id, post?.isFavorite)
              }
              onClick={() => onClick(post)}
            />
          );
        }}
      />
    </div>
  );
}
