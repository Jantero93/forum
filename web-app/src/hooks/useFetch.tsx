import { useCallback, useState } from 'react';

type ApiResponse<T> = {
  data?: T;
  loading: boolean;
  error?: any;
  callApi: () => void;
};

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useFetch = <T,>(
  url: string,
  method: Method,
  payload?: any
): ApiResponse<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);

  const callApi = useCallback(() => {
    setLoading(true);

    const apiCall = async () => {
      try {
        const apiResponse = await fetch(url, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          },
          method
        });

        const data = await apiResponse.json();
        setData(data as T);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  }, [method, url, payload]);

  return { data, loading, error, callApi };
};

export default useFetch;
