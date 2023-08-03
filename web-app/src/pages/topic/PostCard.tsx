import { dateFormatForum } from '~/util/consts';
import {
  formatDate,
  timeDifferenceLessThanHourFromPresent
} from '~/util/dateHelpers';

import { MdThumbUp, MdDelete, MdModeEdit } from 'react-icons/md';
import { useAuthContext } from '~/contexts/AuthContextProvider';
type PostCardProps = {
  postId?: number;
  user: string;
  createdTime: Date;
  message: string;
  votes: number;
  postsUserId?: number;
  sendVotePostRequest: (postId: number) => void;
  sendDeletePostRequest: (postId: number) => void;
};

const voteIconColor = '#48A047';
const deleteIconColor = '#b04231';
const editIconColorEnabled = '#ffd966';
const editIconColorDisabled = '#747679';
const iconSize = 30;

const PostCard = ({
  postId,
  user,
  message,
  createdTime,
  votes,
  postsUserId,
  sendVotePostRequest,
  sendDeletePostRequest
}: PostCardProps) => {
  const bgColorOfTopicsFirstPost =
    postId === undefined ? 'bg-slate-900' : 'bg-slate-700';

  const {
    authState: { userId: loggedInUserId, role }
  } = useAuthContext();

  const isUserAllowedInteractWithPost = () =>
    role === 'ADMIN' || postsUserId === loggedInUserId;

  const showEnabledOrDisabledIcon = () => {
    if (role === 'ADMIN') {
      return true;
    }

    return timeDifferenceLessThanHourFromPresent(createdTime);
  };

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
            {isUserAllowedInteractWithPost() && (
              <span className="flex self-center gap-2 px-2 py-1 rounded-xl bg-slate-600">
                <MdModeEdit
                  size={iconSize}
                  alignmentBaseline="baseline"
                  cursor={showEnabledOrDisabledIcon() ? 'pointer' : 'cursor'}
                  color={
                    showEnabledOrDisabledIcon()
                      ? editIconColorEnabled
                      : editIconColorDisabled
                  }
                  onClick={() => console.log('clicked')}
                />
              </span>
            )}
            <span className="flex gap-2 px-2 py-1 rounded-xl bg-slate-600">
              <MdThumbUp
                size={iconSize}
                color={voteIconColor}
                alignmentBaseline="auto"
                cursor="pointer"
                onClick={() => sendVotePostRequest(postId)}
              />
              <span className="text-2xl text-gray-300">
                {votes === 0 ? '0' : `+${votes}`}
              </span>
            </span>
            {isUserAllowedInteractWithPost() && (
              <span className="flex self-center gap-2 px-2 py-1 rounded-xl bg-slate-600">
                <MdDelete
                  size={iconSize}
                  alignmentBaseline="baseline"
                  cursor="pointer"
                  color={deleteIconColor}
                  onClick={() => sendDeletePostRequest(postId)}
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
