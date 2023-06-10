import { useState } from 'react';

type LocalStorageKey = 'JWT_TOKEN';

export const useLocalStorage = <T>(key: LocalStorageKey) => {
  const [localStorageItem, setLocalStorageValue] = useState(() => {
    const value = localStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  });

  /**
   * @param value Value to set local storage. Null value delete entry from storage
   */
  const setLocalStorageItem = (value: T | null) => {
    value === null
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(value));

    setLocalStorageValue(value);
  };

  return { localStorageItem, setLocalStorageItem };
};
