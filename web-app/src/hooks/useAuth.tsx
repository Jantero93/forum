import { useState } from 'react';
import { decodeJwtClaims } from '~/util/jwt';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { localStorageItem, setLocalStorageItem } =
    useLocalStorage<string>('JWT_TOKEN');

  const [isLogged, setIsLogged] = useState(!!localStorageItem);
  const [role, setRole] = useState<string | null>(null);

  const token = localStorageItem;

  const logInUser = (token: string) => {
    if (!token) {
      logOutUser();
      setRole(null);
      return;
    }

    const decodedJwt = decodeJwtClaims(token);

    setRole(decodedJwt.role);
    setLocalStorageItem(token);
    setIsLogged(true);
  };

  const logOutUser = () => {
    setLocalStorageItem(null);
    setIsLogged(false);
    setRole(null);
  };

  return { isLogged, logInUser, logOutUser, token, role };
};
