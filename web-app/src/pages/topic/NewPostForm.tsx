import React, { Dispatch, SetStateAction } from 'react';

type NewPostFormProps = {
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
};

const NewPostForm = ({ msg, setMsg }: NewPostFormProps) => {
  const imageClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert('Image clicked');
    return false;
  };

  const sendPostClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert('Post sent');
    return false;
  };

  return (
    <form className="rounded-xl">
      <div className="flex p-3">
        <textarea
          rows={3}
          className="w-full p-2 overflow-hidden text-base text-gray-900 bg-gray-100 border-gray-300 rounded-lg resize-none ring-2 ring-slate-500"
          value={msg}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMsg(e.target.value)
          }
        />
        <div className="flex flex-col w-1/12 gap-2 ml-2" id="post-toolbox">
          <button
            className="px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:text-slate-200 hover:bg-green-700"
            onClick={imageClicked}
          >
            Image
          </button>
          <button
            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
            onClick={sendPostClicked}
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewPostForm;
