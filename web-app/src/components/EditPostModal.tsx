import React, { Dispatch, SetStateAction } from 'react';
type EditPostModalProps = {
  message: string;
  setEditMessage: Dispatch<SetStateAction<string>>;
  sendEditedMessage: (e: React.MouseEvent) => void;
};

const EditPostModal = ({
  message,
  setEditMessage,
  sendEditedMessage
}: EditPostModalProps) => (
  <form className="p-3 rounded-xl">
    <div className="flex">
      <textarea
        rows={3}
        className="w-full p-2 overflow-hidden text-base text-gray-900 bg-gray-100 border-gray-300 rounded-lg resize-none ring-2 ring-slate-500"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEditMessage(e.target.value)
        }
        placeholder="Message..."
      />
      <div className="flex flex-col w-1/12 gap-2 ml-2" id="post-toolbox">
        <button
          disabled
          className="px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:text-slate-200"
        >
          Image
        </button>
        <button
          className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
          onClick={sendEditedMessage}
        >
          Send
        </button>
      </div>
    </div>
  </form>
);

export default EditPostModal;
