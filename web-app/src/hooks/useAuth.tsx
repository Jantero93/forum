import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { localStorageItem, setLocalStorageItem } =
    useLocalStorage<string>('JWT_TOKEN');

  const [isLogged, setIsLogged] = useState(!!localStorageItem);
  const token = localStorageItem;

  const logInUser = (token: string) => {
    if (!token) {
      logOutUser();
      return;
    }

    setLocalStorageItem(token);
    setIsLogged(true);
  };

  const logOutUser = () => {
    setLocalStorageItem(null);
    setIsLogged(false);
  };

  return { isLogged, logInUser, logOutUser, token };
};
