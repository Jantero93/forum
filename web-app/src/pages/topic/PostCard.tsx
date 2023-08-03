import { dateFormatForum } from '~/util/consts';
import { formatDate } from '~/util/dateHelpers';

import { MdThumbUp, MdDelete } from 'react-icons/md';
import { useAuthContext } from '~/contexts/AuthContextProvider';
type PostCardProps = {
  postId?: number;
  user: string;
  createdTime: Date;
  message: string;
  votes: number;
  postsUserId?: number;
  sendVotePostRequest: (postId: number) => void;
};

const voteIconColor = '#48A047';
const deleteIconColor = '#b04231';

const PostCard = ({
  postId,
  user,
  message,
  createdTime,
  votes,
  postsUserId,
  sendVotePostRequest
}: PostCardProps) => {
  const bgColorOfTopicsFirstPost =
    postId === undefined ? 'bg-slate-900' : 'bg-slate-700';

  const {
    authState: { userId: loggedInUserId, role }
  } = useAuthContext();

  const isUserAllowedDeletePost = () =>
    role === 'ADMIN' || postsUserId === loggedInUserId;

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
          <div
            id="button-container"
            className="flex justify-end flex-grow gap-2"
          >
            <span className="flex gap-2 px-2 py-1 rounded-xl bg-slate-600">
              <MdThumbUp
                size="30"
                color={voteIconColor}
                alignmentBaseline="auto"
                cursor="pointer"
                onClick={() => sendVotePostRequest(postId)}
              />
              <span className="text-2xl text-gray-300">
                {votes === 0 ? '0' : `+${votes}`}
              </span>
            </span>
            {isUserAllowedDeletePost() && (
              <span className="flex self-center gap-2 px-2 py-1 rounded-xl bg-slate-600">
                <MdDelete
                  size="30"
                  alignmentBaseline="baseline"
                  cursor="pointer"
                  color={deleteIconColor}
                />
              </span>
            )}
          </div>
        )}
      </section>
      <p className="mt-5 text-xl text-slate-300">{message}</p>
    </div>
  );
};

export default PostCard;
