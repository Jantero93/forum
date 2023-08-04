import React, { Dispatch, SetStateAction } from 'react';

type NewPostFormProps = {
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
  sendClicked: (e: React.MouseEvent) => void;
  heading?: string;
  setHeading?: Dispatch<SetStateAction<string>>;
};

const NewPostForm = ({
  msg,
  heading,
  setMsg,
  setHeading,
  sendClicked
}: NewPostFormProps) => {
  const imageClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    alert('Image clicked');
    return false;
  };

  return (
    <form className="p-3 rounded-xl">
      {setHeading && (
        <input
          className="w-1/2 p-2 my-2 overflow-hidden text-base text-gray-900 bg-gray-100 border-gray-300 rounded-lg resize-none ring-2 ring-slate-500"
          value={heading}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHeading(e.target.value)
          }
          placeholder="Heading"
        />
      )}
      <div className="flex">
        <textarea
          rows={3}
          className="w-full p-2 overflow-hidden text-base text-gray-900 bg-gray-100 border-gray-300 rounded-lg resize-none ring-2 ring-slate-500"
          value={msg}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMsg(e.target.value)
          }
          placeholder="Message..."
        />
        <div className="flex flex-col w-1/12 gap-2 ml-2" id="post-toolbox">
          <button
            disabled
            className="px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:text-slate-200"
            onClick={imageClicked}
          >
            Image
          </button>
          <button
            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
            onClick={sendClicked}
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewPostForm;
