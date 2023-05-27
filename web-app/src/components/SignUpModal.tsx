import { Dispatch, SetStateAction, useState } from 'react';

type SignUpModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SignUpModal = ({ setShowModal }: SignUpModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('test submit');
    console.log('username', username);
    console.log('password', password);
  };

  return (
    <div
      id="sign-in-modal"
      className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-gray-900 rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => setShowModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-slate-200">
              Create new user
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-400"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  placeholder-gray-400 focus:outline focus:outline-2 focus:outline-blue-400"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="text-white font-medium mr-2 text-sm px-5 py-2.5 text-center bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="text-white font-medium  text-sm px-5 py-2.5 text-center bg-red-600 rounded-lg hover:text-slate-200 hover:bg-red-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
