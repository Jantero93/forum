import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BoardDto } from '~/data/apiTypes';
import { useFetch } from '~/hooks/useFetch';
import Logo from '~/assets/WebSiteLogo.png';
import env from '~/util/env';
import SignedInCard from './SignedInCard';
import LogInForm from './LogInForm';
import SignUpModal from '../SignUpModal';
import { useAuth } from '~/hooks/useAuth';

type LoginResponse = { token: string };

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogged, logInUser, logOutUser } = useAuth();

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
      logInUser(loginResponse.token);
    }
  };

  const formOrLoggedInComponent = (): JSX.Element => {
    if (showSignIn) return <SignUpModal setShowModal={setShowSignIn} />;

    return isLogged ? (
      <SignedInCard handleLogOutClick={handleLogOutClick} />
    ) : (
      <LogInForm
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogInClick={handleLogInClick}
        handleSignInModalClick={handleSignInModalClick}
      />
    );
  };

  const handleLogOutClick = () => logOutUser();

  return (
    <nav
      id="default-sidebar"
      className="top-0 left-0 z-40 w-64 h-full sm:translate-x-0"
    >
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto ">
        <div className="mb-4 rounded-lg cursor-pointer hover:bg-gray-700">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        {formOrLoggedInComponent()}
        <ul className="pt-6 space-y-2 font-medium">
          {boardResponse?.map(({ id, name }) => (
            <li key={id}>
              <Link
                className="flex items-center p-2 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-purple-300"
                to={`/${name}`}
              >
                <span className="flex-1 ml-2 text-xl font-medium whitespace-nowrap">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
