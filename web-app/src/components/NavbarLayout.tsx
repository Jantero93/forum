import { Link } from 'react-router-dom';
import Logo from '../assets/WebSiteLogo.png';
import { useState } from 'react';

import SignUpModal from './SignUpModal';

type LayoutProps = {
  children: React.ReactNode;
};

const boards = ['Kissat', 'Koirat', 'Tietokoneet'];

const NavbarLayout = ({ children }: LayoutProps) => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInModalClick = () => setShowSignIn(true);

  return (
    <div className="flex items-center min-h-screen bg-slate-700">
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40 w-64 h-screen mr-auto bg-green-400 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="mb-4 rounded-lg cursor-pointer hover:bg-gray-700">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <form className="px-4">
            <input
              className="w-full p-1 mb-2 border rounded appearance-none mshadow"
              name="Email"
              type="text"
              placeholder="Email"
            />
            <input
              className="w-full p-1 mb-2 border rounded appearance-none mshadow"
              name="Passowrd"
              type="text"
              placeholder="Password"
            />

            <button className="px-3 py-2 mb-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:text-slate-200 hover:bg-blue-700">
              Sign in
            </button>
            <p
              aria-hidden={true}
              className="text-sm text-sky-400 hover:text-purple-300 hover:cursor-pointer"
              onClick={handleSignInModalClick}
              onKeyDown={handleSignInModalClick}
            >
              No account? Create one!
            </p>
          </form>
          <ul className="pt-6 space-y-2 font-medium">
            {boards.map((board) => (
              <li key={board}>
                <Link
                  className="flex items-center p-2 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-purple-300"
                  to={board}
                >
                  <span className="flex-1 ml-2 text-xl font-medium whitespace-nowrap">
                    {board}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="bg-blue-300 ">{children}</div>
      {showSignIn && <SignUpModal setShowModal={setShowSignIn} />}
    </div>
  );
};

export default NavbarLayout;
