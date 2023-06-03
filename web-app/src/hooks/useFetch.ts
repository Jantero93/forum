import { useEffect, useState } from 'react';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

type ApiResponse<T> = {
  data?: T;
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
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [refresh, setRefresh] = useState(fetchImmediately);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      if (!refresh) return;

      const fetchOptions: RequestInit = {
        method: method,
        body: JSON.stringify(payload),
        headers: payload && { 'Content-Type': 'application/json' }
      };

      try {
        const apiResponse = await fetch(url, fetchOptions);
        const data = await apiResponse.json();
        setData(data as T);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchData();
  }, [url, loading, refresh, method, payload]);

  /** Triggers api call manually */
  const callApi = () => setRefresh(true);

  return { data, loading, error, callApi };
};
