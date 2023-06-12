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

export type TopicDto = {
  id: number;
  header: string;
  message: string;
  creator: string;
  createdTime: Date;
};
