import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type ApiResponse<T> = {
  response?: T;
  loading: boolean;
  error?: any;
  callApi: () => void;
};

export const useFetch = <T>(
  url: string,
  method: Method,
  payload?: any,
  fetchImmediately = true
): ApiResponse<T> => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(fetchImmediately);
  const { localStorageItem } = useLocalStorage('JWT_TOKEN');

  useEffect(() => {
    const fetchResponse = async () => {
      if (loading) return;
      if (!refresh) return;

      const headers: HeadersInit = {};

      if (localStorageItem) {
        headers['authorization'] = localStorageItem as string;
      }

      if (method === 'POST' || method === 'PUT') {
        headers['content-type'] = 'application/json';
      }

      const body = payload ? JSON.stringify(payload) : undefined;

      const fetchOptions: RequestInit = {
        method,
        headers,
        body
      };

      try {
        const apiResponse = await fetch(url, fetchOptions);
        const response = await apiResponse.json();
        setResponse(response as T);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchResponse();
  }, [url, loading, refresh, method, payload]);

  /** Triggers api call manually */
  const callApi = () => setRefresh(true);

  return { response, loading, error, callApi };
};
