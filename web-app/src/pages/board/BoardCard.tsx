import React from 'react';
import { Link } from 'react-router-dom';
import { TopicPageLocationState } from '../topic/TopicPage';

type BoardCardProps = { boardId: number; name: string; description: string };

const BoardCard = ({ boardId, name, description }: BoardCardProps) => {
  const topicPageProps: TopicPageLocationState = {
    boardName: name,
    boardId,
    description
  };

  return (
    <div className="w-5/6 max-w-screen-xl border border-black bg-slate-800 rounded-xl hover:shadow-inner hover:cursor-pointer">
      <Link to={name.toLowerCase()} state={topicPageProps}>
        <div className="px-6 py-4 hover:bg-slate-900 text-cyan-600 hover:text-cyan-400">
          <p className="text-2xl font-bold ">{name}</p>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BoardCard;
