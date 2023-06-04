import { useEffect, useState } from 'react';

type LocalStorageKey = 'JWT_TOKEN';

export const useLocalStorage = <T>(key: LocalStorageKey) => {
  const localStorageString = localStorage.getItem(key);

  const [localStorageItem, setLocalStorageItem] = useState<T | undefined>(
    localStorageString ? (JSON.parse(localStorageString) as T) : undefined
  );

  useEffect(() => {
    if (localStorageItem) {
      localStorage.setItem(key, JSON.stringify(localStorageItem));
    }
  }, [key, localStorageItem]);

  return { localStorageItem, setLocalStorageItem };
};
