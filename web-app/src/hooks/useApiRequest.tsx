import { useState, useEffect } from 'react';
import { FetchConfig, useFetch } from '~/hooks/useFetch';
import { toast as sendToast } from 'react-toastify';

interface ApiResponse<T> {
  responseData: T | null;
  error: string | null;
  statusCode: number | null;
  sendRequest: () => void;
}

const useApiRequest = <T,>(
  url: string,
  config: FetchConfig
): ApiResponse<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const {
    data,
    error: fetchError,
    sendRequest,
    statusCode: resStatusCode
  } = useFetch<T>(url, config);

  useEffect(() => {
    if (data) {
      setResponseData(data);
    }
  }, [data]);

  useEffect(() => {
    const isStatusCodeError = resStatusCode ?? 500 >= 400;
    const isFetchError = fetchError !== null && fetchError !== '';

    if (!isFetchError || !isStatusCodeError) {
      return;
    }

    console.log('url', url);

    setError(fetchError);
    setStatusCode(resStatusCode);
    sendToast.error(fetchError);
  }, [fetchError, resStatusCode, url]);

  return {
    responseData,
    error,
    statusCode,
    sendRequest
  };
};

export default useApiRequest;
