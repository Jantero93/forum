import { useEffect } from 'react';

export const useTitle = (newTitle: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = newTitle;

    return () => {
      document.title = prevTitle;
    };
  }, [newTitle]);
};
