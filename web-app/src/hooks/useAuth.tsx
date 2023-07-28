import { isBefore } from '~/util/dateHelpers';
import { decodeJwtClaims } from '~/util/jwt';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { localStorageItem: token, setLocalStorageItem: setTokenLocalStorage } =
    useLocalStorage<string>('JWT_TOKEN');

  const logInUser = (token: string) => setTokenLocalStorage(token);
  const logOutUser = () => setTokenLocalStorage(null);

  const checkTokenExpiration = () => {
    if (token === null) {
      logOutUser();
      return;
    }

    const { exp } = decodeJwtClaims(token);

    isBefore(new Date(), exp) ? logInUser(token) : logOutUser();
  };

  if (!token) {
    return {
      isLogged: false,
      logInUser,
      logOutUser,
      token: null,
      role: null,
      username: null,
      checkTokenExpiration
    };
  }

  const { sub, role } = decodeJwtClaims(token);

  return {
    isLogged: !!token,
    logInUser,
    logOutUser,
    token,
    role,
    username: sub,
    checkTokenExpiration
  };
};
