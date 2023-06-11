import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useLogIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { localStorageItem } = useLocalStorage('JWT_TOKEN');

  useEffect(() => {
    const isLoggedIn = !!localStorageItem;
    setLoggedIn(isLoggedIn);
  }, [localStorageItem]);

  return {
    loggedIn
  };
};
