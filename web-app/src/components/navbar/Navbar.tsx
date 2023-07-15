import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoardDto } from '~/data/apiTypes';
import Logo from '~/assets/WebSiteLogo.png';
import env from '~/util/env';
import SignedInCard from './SignedInCard';
import LogInForm from './LogInForm';
import SignUpModal from '../SignUpModal';
import { useAuth } from '~/hooks/useAuth';
import { useFetch } from '~/hooks/useFetch';

type LoginResponse = { token: string };
type RegisterResponse = { token: string };

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogged, logInUser, logOutUser } = useAuth();

  const loginUrl = `${env.API_URL}/auth/authenticate`;
  const payload = { email, password };

  const { data: loginResponse, sendRequest } = useFetch<LoginResponse>(
    loginUrl,
    {
      method: 'POST',
      payload
    }
  );

  const { data: registerResponse, sendRequest: sendRegisterReqeust } =
    useFetch<RegisterResponse>(`${env.API_URL}/auth/register`, {
      method: 'POST',
      payload: { email: password, password } as const
    });

  const { data: boardResponse } = useFetch<BoardDto[]>(`${env.API_URL}/boards`);

  useEffect(() => {
    if (loginResponse?.token) {
      logInUser(loginResponse.token);
    }
  }, [loginResponse]);

  useEffect(() => {
    if (registerResponse?.token) {
      logInUser(registerResponse.token);
      setShowSignIn(false);
    }
  }, [registerResponse]);

  const handleSignInModalClick = () => setShowSignIn(true);

  const handleLogInClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    sendRequest();
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    sendRegisterReqeust();
  };

  const handleLogOutClick = () => logOutUser();

  const formOrLoggedInComponent = (): JSX.Element => {
    if (showSignIn)
      return (
        <SignUpModal
          setPassword={setPassword}
          setEmail={setEmail}
          setShowModal={setShowSignIn}
          handleRegisterClick={handleRegisterClick}
        />
      );

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
