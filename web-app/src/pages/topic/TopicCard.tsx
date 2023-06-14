import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '~/util/dateHelpers';

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
}: TopicCardProps) => (
  <div className="max-w-screen-xl p-3 overflow-hidden text-white border-black rounded-xl bg-slate-800 hover:cursor-pointer hover:bg-slate-900">
    <Link to={topicId.toString()}>
      <p className="text-2xl text-slate-100">{header}</p>
      <p className="text-slate-500">
        {formatDate(createdTime, 'DD.MM.YYYY h:mm:ss')}
      </p>
      <p className="text-slate-500">{creator}</p>
      <p className="text-slate-300">{message}</p>
    </Link>
  </div>
);

export default TopicCard;
