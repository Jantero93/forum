import { useEffect, useState } from 'react';

type ApiResponse<T> = {
  data?: T;
  loading: boolean;
  statusCode?: number;
  statusText: string;
  error?: any;
};

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useFetch = <T,>(
  url: string,
  method: Method,
  payload?: any
): ApiResponse<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    const apiCall = async () => {
      const apiResponse = await fetch(url, {
        body: payload,
        method
      });

      try {
        const { status, statusText } = apiResponse;
        const data = await apiResponse.json();

        setStatusCode(status);
        setStatusText(statusText);
        setData(data as T);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };

    apiCall();
  }, [url, method, payload]);

  return { data, loading, statusCode, statusText, error };
};

export default useFetch;
