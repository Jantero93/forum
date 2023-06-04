import { Dispatch, useEffect, useState } from 'react';

type UseLocalStorage<T> = {
  value: T | undefined;
  setValue: Dispatch<React.SetStateAction<T | undefined>>;
};

export const useLocalStorage = <T>(key: string): UseLocalStorage<T> => {
  const localStorageString = localStorage.getItem(key);

  const [value, setValue] = useState<T | undefined>(
    localStorageString ? JSON.parse(localStorageString) : undefined
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
};
