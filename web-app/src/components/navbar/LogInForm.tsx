import React, { Dispatch, SetStateAction } from 'react';

type LogInFormProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogInClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleSignInModalClick: () => void;
};

const LogInForm = ({
  setEmail,
  setPassword,
  handleSignInModalClick,
  handleLogInClick
}: LogInFormProps) => {
  return (
    <form className="px-4">
      <input
        className="w-full p-1 mb-2 border rounded appearance-none mshadow"
        name="Email"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-1 mb-3 border rounded appearance-none mshadow"
        name="Password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="px-3 py-2 mb-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700"
        onClick={handleLogInClick}
      >
        Sign in
      </button>
      <p
        aria-hidden
        className="text-sm text-sky-400 hover:text-purple-300 hover:cursor-pointer"
        onClick={handleSignInModalClick}
        onKeyDown={handleSignInModalClick}
      >
        No account? Create one!
      </p>
    </form>
  );
};

export default LogInForm;
