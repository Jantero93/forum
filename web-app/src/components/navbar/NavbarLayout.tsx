import { Link } from 'react-router-dom';
import Logo from '~/assets/WebSiteLogo.png';
import { useState } from 'react';

import SignUpModal from '~/components/SignUpModal';
import { useFetch } from '~/hooks/useFetch';
import env from '~/util/env';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import LogInForm from './LogInForm';
import SignedInCard from './SignedInCard';
import { BoardDto } from '~/data/boards/boadType';

type LayoutProps = {
  children: React.ReactNode;
};

type LoginResponse = { token: string };

const NavbarLayout = ({ children }: LayoutProps) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { localStorageItem, setLocalStorageItem } =
    useLocalStorage('JWT_TOKEN');

  const loginUrl = `${env.API_URL}/auth/authenticate`;
  const payload = { email, password };
  const { response: loginResponse, callApi } = useFetch<LoginResponse>(
    loginUrl,
    'POST',
    payload,
    false
  );

  const { response: boardResponse } = useFetch<BoardDto[]>(
    `${env.API_URL}/boards`,
    'GET'
  );

  const handleSignInModalClick = () => setShowSignIn(true);

  const handleLogInClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    callApi();

    if (loginResponse?.token) {
      setLocalStorageItem(loginResponse.token);
    }
  };

  const handleLogOutClick = () => setLocalStorageItem(null);

  return (
    <div className="flex min-h-screen">
      <nav
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

          {!localStorageItem ? (
            <LogInForm
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogInClick={handleLogInClick}
              handleSignInModalClick={handleSignInModalClick}
            />
          ) : (
            <SignedInCard handleLogOutClick={handleLogOutClick} />
          )}

          <ul className="pt-6 space-y-2 font-medium">
            {boardResponse?.map((board) => (
              <li key={board.id}>
                <Link
                  className="flex items-center p-2 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-purple-300"
                  to={board.name.toLowerCase().trim()}
                >
                  <span className="flex-1 ml-2 text-xl font-medium whitespace-nowrap">
                    {board.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {showSignIn && <SignUpModal setShowModal={setShowSignIn} />}
      <main className="flex flex-grow p-4 bg-slate-700 ">{children}</main>
    </div>
  );
};

export default NavbarLayout;
