import { useState } from 'react';
import { isBefore } from '~/util/dateHelpers';
import { decodeJwtClaims } from '~/util/jwt';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { localStorageItem, setLocalStorageItem } =
    useLocalStorage<string>('JWT_TOKEN');

  const [isLogged, setIsLogged] = useState(!!localStorageItem);
  const [userRole, setUserRole] = useState<string | null>(null);

  const token = localStorageItem;

  const logInUser = (token: string) => {
    if (!token) {
      logOutUser();
      setUserRole(null);
      return;
    }

    const { role } = decodeJwtClaims(token);

    setUserRole(role);
    setLocalStorageItem(token);
    setIsLogged(true);
  };

  const logOutUser = () => {
    setLocalStorageItem(null);
    setIsLogged(false);
    setUserRole(null);
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
    checkTokenExpiration
  };
};
