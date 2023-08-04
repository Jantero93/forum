import {
  formatDate,
  timeDifferenceLessThanHourFromPresent
} from '~/util/dateHelpers';

import { MdThumbUp, MdDelete, MdModeEdit } from 'react-icons/md';
import { useAuthContext } from '~/contexts/AuthContextProvider';
import EditPostModal from '~/components/EditPostModal';
import { Dispatch, SetStateAction, useState } from 'react';
type PostCardProps = {
  postId?: number;
  user: string;
  createdTime: Date;
  message: string;
  votes: number;
  postsUserId?: number;
  sendVotePostRequest: (postId: number) => void;
  sendDeletePostRequest: (postId: number) => void;
  editMessage?: string;
  setEditMessage?: Dispatch<SetStateAction<string>>;
  clickedEditedPost?: number | null;
  setClickedEditedPost?: Dispatch<SetStateAction<number | null>>;
  setSendPutRequest?: Dispatch<SetStateAction<boolean>>;
};

const voteIconColor = '#48A047';
const deleteIconColor = '#b04231';
const editIconColorEnabled = '#ffd966';
const editIconColorDisabled = '#747679';
const iconSize = 30;
const alignmentBaseline = 'baseline';

const dateFormatForum = 'DD.MM.YYYY [klo] H:mm:ss';

const PostCard = ({
  postId,
  user,
  message,
  createdTime,
  votes,
  postsUserId,
  sendVotePostRequest,
  sendDeletePostRequest,
  editMessage,
  setEditMessage,
  clickedEditedPost,
  setClickedEditedPost,
  setSendPutRequest
}: PostCardProps) => {
  const [showEditForm, setShowEditFrom] = useState(false);

  const bgColorOfTopicsFirstPost =
    postId === undefined ? 'bg-slate-900' : 'bg-slate-700';

  const {
    authState: { userId: loggedInUserId, role }
  } = useAuthContext();

  const isUserAllowedInteractWithPost =
    role === 'ADMIN' || postsUserId === loggedInUserId;

  const showEnabledOrDisabledIcon = () => {
    if (role === 'ADMIN') {
      return true;
    }

    return timeDifferenceLessThanHourFromPresent(createdTime);
  };

  const handleShowEditMessageForm = () => {
    if (setClickedEditedPost === undefined || postId === undefined) {
      return;
    }

    if (clickedEditedPost === postId) {
      setShowEditFrom(false);
      setClickedEditedPost(null);
      return;
    }

    setClickedEditedPost(postId);
    setShowEditFrom(true);
  };

  const shouldShowEditForm =
    showEditForm &&
    editMessage !== undefined &&
    setEditMessage !== undefined &&
    postId === clickedEditedPost;

  const sendEditedMessageRequest = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!clickedEditedPost || setSendPutRequest === undefined) {
      return;
    }

    setSendPutRequest(true);
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
            {isUserAllowedInteractWithPost && (
              <span className="flex self-center gap-2 px-2 py-1 rounded-xl bg-slate-600">
                <MdModeEdit
                  size={iconSize}
                  alignmentBaseline={alignmentBaseline}
                  cursor={showEnabledOrDisabledIcon() ? 'pointer' : 'cursor'}
                  color={
                    showEnabledOrDisabledIcon()
                      ? editIconColorEnabled
                      : editIconColorDisabled
                  }
                  onClick={
                    showEnabledOrDisabledIcon()
                      ? handleShowEditMessageForm
                      : void 0
                  }
                />
              </span>
            )}
            <span className="flex gap-2 px-2 py-1 rounded-xl bg-slate-600">
              <MdThumbUp
                size={iconSize}
                color={voteIconColor}
                alignmentBaseline={alignmentBaseline}
                cursor="pointer"
                onClick={() => sendVotePostRequest(postId)}
              />
              <span className="text-2xl text-gray-300">
                {votes === 0 ? '0' : `+${votes}`}
              </span>
            </span>
            {isUserAllowedInteractWithPost && (
              <span className="flex self-center gap-2 px-2 py-1 rounded-xl bg-slate-600">
                <MdDelete
                  size={iconSize}
                  alignmentBaseline={alignmentBaseline}
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
      {shouldShowEditForm &&
        editMessage !== undefined &&
        setEditMessage !== undefined && (
          <EditPostModal
            message={editMessage}
            setEditMessage={setEditMessage}
            sendEditedMessage={sendEditedMessageRequest}
          />
        )}
    </div>
  );
};

export default PostCard;
