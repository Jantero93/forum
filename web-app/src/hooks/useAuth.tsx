import { useState } from 'react';
import { isBefore } from '~/util/dateHelpers';
import { decodeJwtClaims } from '~/util/jwt';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { localStorageItem, setLocalStorageItem } =
    useLocalStorage<string>('JWT_TOKEN');

  const [isLogged, setIsLogged] = useState(!!localStorageItem);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const token = localStorageItem;

  const logInUser = (token: string) => {
    if (!token) {
      logOutUser();
      setUserRole(null);
      return;
    }

    const { role, sub } = decodeJwtClaims(token);

    setUserRole(role);
    setUsername(sub);
    setLocalStorageItem(token);
    setIsLogged(true);
  };

  const logOutUser = () => {
    setUserRole(null);
    setUsername(null);
    setLocalStorageItem(null);
    setIsLogged(false);
  };

  const checkTokenExpiration = () => {
    const token = localStorageItem;

    if (token === null) {
      logOutUser();
      return;
    }

    const { exp } = decodeJwtClaims(token);

    if (isBefore(exp, new Date())) {
      logInUser(token);
    }
  };

  return {
    isLogged,
    logInUser,
    logOutUser,
    token,
    role: userRole,
    username,
    checkTokenExpiration
  };
};
