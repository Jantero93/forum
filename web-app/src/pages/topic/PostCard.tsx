import { dateFormatForum } from '~/util/consts';
import { formatDate } from '~/util/dateHelpers';

import { MdThumbUp } from 'react-icons/md';
type PostCardProps = {
  postId?: number;
  user: string;
  createdTime: Date;
  message: string;
  votes: number;
  sendVotePostRequest: (postId: number) => void;
};

const greenColor = '#48A047';

const PostCard = ({
  postId,
  user,
  message,
  createdTime,
  votes,
  sendVotePostRequest
}: PostCardProps) => {
  const bgColorOfTopicsFirstPost =
    postId === undefined ? 'bg-slate-900' : 'bg-slate-700';

  return (
    <div
      className={`flex-grow p-4 text-white ${bgColorOfTopicsFirstPost}  rounded-xl`}
    >
      <section className="flex gap-5 p-1">
        <p className="text-lg text-cyan-400">{user}</p>
        <p className="text-lg text-slate-500">
          {formatDate(createdTime, dateFormatForum)}
        </p>
        {postId && (
          <span className="flex gap-2 px-2 py-1 ml-auto rounded-xl bg-slate-600">
            <MdThumbUp
              size="30"
              color={greenColor}
              alignmentBaseline="auto"
              style={{
                cursor: 'pointer'
              }}
              onClick={() => sendVotePostRequest(postId)}
            />
            <span className="text-2xl text-gray-300">
              {votes === 0 ? '0' : `+${votes}`}
            </span>
          </span>
        )}
      </section>
      <p className="mt-5 text-xl text-slate-300">{message}</p>
    </div>
  );
};

export default PostCard;
