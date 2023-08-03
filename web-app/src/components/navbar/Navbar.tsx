import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoardDto } from '~/data/apiTypes';
import Logo from '~/assets/WebSiteLogo.png';
import env from '~/util/env';
import SignedInCard from './SignedInCard';
import LogInForm from './LogInForm';
import SignUpModal from '../SignUpModal';
import { useFetch } from '~/hooks/useFetch';
import ErrorPage from '~/pages/ErrorPage';
import { useAuthContext } from '~/contexts/AuthContextProvider';
import { toast as sendToast } from 'react-toastify';

type LoginResponse = { token: string };
type RegisterResponse = { token: string };

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [logOutClicked, setLogOutClicked] = useState(false);
  const [password, setPassword] = useState('');

  const { authState, updateAuthState } = useAuthContext();
  const { isLogged } = authState;

  const loginUrl = `${env.API_URL}/auth/authenticate`;
  const payload = { email, password } as const;

  const {
    data: loginResponse,
    sendRequest: sendLoginRequest,
    nullApiResponse: nullLoginResponse,
    error: loginError,
    nullResponseError: nullLoginError
  } = useFetch<LoginResponse>(loginUrl, {
    method: 'POST',
    payload
  });

  const {
    data: registerResponse,
    sendRequest: sendRegisterReqeust,
    nullApiResponse: nullRegisterResponse,
    error: registerError,
    nullResponseError: nullRegisterError
  } = useFetch<RegisterResponse>(`${env.API_URL}/auth/register`, {
    method: 'POST',
    payload
  });

  const { data: boardResponse, error } = useFetch<BoardDto[]>(
    `${env.API_URL}/boards`
  );

  // Send login request and receive response
  useEffect(() => {
    if (loginResponse?.token && !logOutClicked && !authState.isLogged) {
      updateAuthState(loginResponse.token);
      nullLoginResponse();
    }
  }, [
    loginResponse,
    logOutClicked,
    updateAuthState,
    authState.isLogged,
    nullLoginResponse
  ]);

  // Send register request and receive response
  useEffect(() => {
    if (registerResponse?.token && !logOutClicked && !authState.isLogged) {
      updateAuthState(registerResponse.token);
      sendToast.success('Registered successfully');
      nullRegisterResponse();
      setShowSignIn(false);
    }
  }, [
    registerResponse,
    logOutClicked,
    updateAuthState,
    authState.isLogged,
    nullRegisterResponse
  ]);

  // Login error handling
  useEffect(() => {
    if (loginError) {
      sendToast.error(loginError);
      nullLoginError();
    }
  }, [loginError, nullLoginError]);

  // Register error handling
  useEffect(() => {
    if (registerError) {
      sendToast.error(registerError);
      nullRegisterError();
    }
  }, [registerError, nullRegisterError]);

  const handleSignInModalClick = () => setShowSignIn(true);

  const handleLogInClick = (e: React.MouseEvent<HTMLElement>) => {
    setLogOutClicked(false);
    e.preventDefault();
    sendLoginRequest();
    clearInputs();
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLElement>) => {
    setLogOutClicked(false);
    e.preventDefault();
    sendRegisterReqeust();
    clearInputs();
  };

  const handleLogOutClick = () => {
    setLogOutClicked(true);
    updateAuthState(null);
  };

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const formOrLoggedInComponent = (): React.JSX.Element => {
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

  if (error) {
    return <ErrorPage message={error} />;
  }

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
