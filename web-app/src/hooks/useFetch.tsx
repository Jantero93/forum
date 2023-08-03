import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '~/contexts/AuthContextProvider';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type FetchConfig = {
  method?: HttpMethod;
  payload?: any;
};

type ErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
};

/**
 * Utility for fetching data. If config is given, api call have to be triggered
 * with sendRequest method
 * @param url Url to fetch
 * @param config Config, e.g. Method, payload
 * @returns void, api response is in hook
 */
export const useFetch = <T,>(url: string, config?: FetchConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const { authState } = useAuthContext();
  const authorizationHeader = authState.token;

  const sendRequest = useCallback(async () => {
    try {
      setLoading(true);

      const { method = 'GET', payload } = config ?? {};

      const headers: HeadersInit = {};

      if (authorizationHeader) {
        headers['authorization'] = `Bearer ${authorizationHeader}`;
      }
      headers['content-type'] = 'application/json';

      const options: RequestInit = {
        method,
        headers,
        body: JSON.stringify(payload)
      };

      const response = await fetch(url, options);
      setStatusCode(response.status);

      if (!response?.ok) {
        const res = (await response.json()) as ErrorResponse;
        setError(res.message);
        return;
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError('Internal Server Error');
    } finally {
      setLoading(false);
    }
  }, [authorizationHeader, config, url]);

  useEffect(() => {
    // Disable automatic fetching if config is present
    if (config) {
      return;
    }

    sendRequest();
  }, [url, config?.method, config?.payload, config, sendRequest]);

  const nullResponseError = () => setError('');
  const nullApiResponse = () => setData(null);

  return {
    data,
    loading,
    error,
    statusCode,
    sendRequest,
    nullResponseError,
    nullApiResponse
  };
};
