import React from 'react';

import { Post } from '../../models/post';
import Heart from '../icons/Heart';
import Clap from '../icons/Clap';

interface PostCardProps {
  post: Post;
  onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
  toggleFavorite: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onClick = () => {},
  toggleFavorite = () => {},
}) => {
  return (
    <div
      className="drop-shadow-md bg-white rounded-lg py-6 px-4 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h1 className="text-2xl">{post.title}</h1>
      </div>

      <div className="flex gap-x-2 items-end my-2">
        {post?.tags?.length > 0 &&
          post?.tags.map((tag) => {
            return <span className="text-xs" key={tag}>{`#${tag}`}</span>;
          })}
      </div>
      <p className="text-sm mt-2 ">{post.body}</p>

      <div className="flex items-center pt-4">
        <div className="flex flex-none w-14 justify-center">
          <Clap height={24} width={24} />
          <span className="ml-2">{post?.reactions}</span>
        </div>
        <div className="flex flex-none w-14 justify-center">
          <button onClick={toggleFavorite}>
            <Heart
              height={24}
              width={24}
              className={post?.isFavorite ? 'fill-red-500' : 'stroke-current'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
