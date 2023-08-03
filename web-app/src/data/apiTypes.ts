export type BoardDto = {
  id: number;
  name: string;
  description: string;
};

export type BoardTopicsDto = {
  id: number;
  name: string;
  adjective: string;
  topics: TopicDto[];
};

export type TopicWithPostsDto = {
  id: number;
  header: string;
  message: string;
  creator: string;
  createdTime: Date;
  votes: number;
  posts: PostDto[];
};

export type PostDto = {
  id: number;
  message: string;
  votes: number;
  createdTime: Date;
  updatedTime: Date;
  user: string;
  userId: number;
};

export type TopicDto = {
  id: number;
  header: string;
  message: string;
  creator: string;
  createdTime: Date;
};
