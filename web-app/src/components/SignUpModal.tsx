import { Dispatch, SetStateAction } from 'react';

type SignUpModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleRegisterClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const SignUpModal = ({
  setShowModal,
  handleRegisterClick,
  setEmail,
  setPassword
}: SignUpModalProps) => (
  <form className="px-4">
    <div>
      <input
        className="w-full p-1 mb-2 border rounded appearance-none mshadow"
        placeholder="Username"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <input
        className="w-full p-1 mb-3 border rounded appearance-none mshadow"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="flex gap-3">
      <button
        className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
        onClick={handleRegisterClick}
      >
        Register
      </button>
      <button
        className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:text-slate-200 hover:bg-red-700"
        onClick={() => setShowModal(false)}
      >
        Cancel
      </button>
    </div>
  </form>
);

export default SignUpModal;
