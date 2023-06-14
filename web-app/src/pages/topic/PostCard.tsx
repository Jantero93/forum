import React from 'react';
import { formatDate } from '~/util/dateHelpers';

type PostCardProps = {
  user: string;
  createdTime: Date;
  message: string;
  votes: number;
};

const PostCard = ({
  user,
  message,
  createdTime,
  votes: _votes
}: PostCardProps) => {
  return (
    <div className="flex-grow p-4 text-white bg-slate-700 rounded-xl">
      <div className="flex gap-5">
        <p className="text-lg text-cyan-400">{user}</p>
        <p className="text-lg text-slate-500">
          {formatDate(createdTime, 'DD.MM.YYYY [klo] h:mm:ss')}
        </p>
      </div>
      <p className="text-xl text-slate-300">{message}</p>
    </div>
  );
};

export default PostCard;
