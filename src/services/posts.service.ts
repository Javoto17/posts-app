import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';

const PostsService = {
  all: async (limit: number = 10, skip: number) => {
    return await axios.get(BASE_URL + 'posts', {
      params: {
        limit,
        ...(skip && {
          skip,
        }),
      },
    });
  },
  getComments: async (id: number) => {
    return await axios.get(`${BASE_URL}posts/${id}/comments`);
  },
};

export default PostsService;
