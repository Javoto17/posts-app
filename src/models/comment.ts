import { User } from './user';

export type Comment = {
  id: number;
  body: string;
  postId: number;
  user: User;
};
