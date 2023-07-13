import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type FetchConfig = {
  method?: HttpMethod;
  payload?: any;
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
  const [error, setError] = useState<any | null>(null);

  const { token: authorizationHeader } = useAuth();

  const sendRequest = async () => {
    try {
      setLoading(true);

      const { method = 'GET', payload } = config ?? {};

      const headers: HeadersInit = {};

      if (authorizationHeader) {
        headers['authorization'] = `Bearer ${authorizationHeader}`;
      }

      if (method === 'POST' || method === 'PUT') {
        headers['content-type'] = 'application/json';
      }

      const options: RequestInit = {
        method,
        headers,
        body: JSON.stringify(payload)
      };

      const response = await fetch(url, options);

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Disable automatic fetching if config is present
    if (config) {
      return;
    }

    sendRequest();
  }, [url, config?.method, config?.payload]);

  return { data, loading, error, sendRequest };
};
