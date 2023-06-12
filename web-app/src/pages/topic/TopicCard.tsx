import React from 'react';
import { Link } from 'react-router-dom';

type TopicCardProps = {
  topicId: number;
  createdTime: Date;
  creator: string;
  header: string;
  message: string;
};

const TopicCard = ({
  createdTime,
  creator,
  header,
  message,
  topicId
}: TopicCardProps) => {
  return (
    <div className="max-w-screen-xl p-3 overflow-hidden border-black rounded-xl bg-slate-800 hover:cursor-pointer">
      <Link to={topicId.toString()}>
        <p>{createdTime.toString()}</p>
        <p>{creator}</p>
        <p>{header}</p>
        <p>{message}</p>
        <p>{topicId}</p>
      </Link>
    </div>
  );
};

export default TopicCard;
