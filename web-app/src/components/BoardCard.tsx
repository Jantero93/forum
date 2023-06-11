import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';

type BoardCardProps = { boardId: number; name: string; description: string };

const BoardCard = ({ boardId, name, description }: BoardCardProps) => {
  const {} = useFetch(`${env.API_URL}/board?id=${boardId}`, 'GET');

  return (
    <div className="w-5/6 max-w-screen-xl border border-black bg-slate-800 rounded-xl hover:shadow-inner hover:cursor-pointer">
      <Link to={name.toLowerCase()}>
        <div className="px-6 py-4 hover:bg-slate-900 text-cyan-600 hover:text-cyan-400">
          <p className="text-2xl font-bold ">{name}</p>
          <p>{description}</p>
          <p className="mt-2 text-slate-300">Viimeisin postaus</p>
        </div>
      </Link>
    </div>
  );
};

export default BoardCard;
