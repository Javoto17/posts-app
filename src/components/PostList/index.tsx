import React, { useEffect } from "react";

import { Post } from "@/models/post";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface PostListProps {
  data: Post[];
  isLoading: boolean;
  onReachedLimit: Function;
  isLimitReached: boolean;
  renderItem: (post: Post, i: number) => React.ReactNode;
  error: string | null;
}

const PostList: React.FC<PostListProps> = ({
  data = [],
  isLoading = false,
  renderItem = () => null,
  isLimitReached = false,
  onReachedLimit = () => {},
  error,
}) => {
  const [isVisible, setRef] = useIntersectionObserver({
    root: null,
    threshold: 0.5,
  });

  useEffect(() => {
    if (isVisible && !isLimitReached) {
      onReachedLimit();
    }
  }, [isVisible, isLimitReached]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {data.map((post, i) => {
          return (
            <div
              className="flex-1"
              key={`post-${post?.id}`}
              ref={(el) => {
                if (data?.length - 1 === i) {
                  setRef<HTMLDivElement>(el);
                }
              }}
            >
              {renderItem(post, i)}
            </div>
          );
        })}
      </div>
      {isLoading && <p>Loading.. </p>}
      {!!error && <p>Something went wrong.. </p>}
    </>
  );
};

export default PostList;
