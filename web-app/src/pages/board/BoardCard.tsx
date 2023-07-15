import { Link } from 'react-router-dom';

type BoardCardProps = { boardId: number; name: string; description: string };

const BoardCard = ({ name, description }: BoardCardProps) => (
  <div className="w-5/6 max-w-screen-xl overflow-hidden border-black rounded-xl bg-slate-800 hover:cursor-pointer">
    <Link to={name}>
      <div className="px-6 py-4 hover:bg-slate-900 text-cyan-600 hover:text-cyan-400">
        <p className="text-2xl font-bold ">{name}</p>
        <p>{description}</p>
      </div>
    </Link>
  </div>
);

export default BoardCard;
