import { useRouteError } from 'react-router-dom';

type ErrorMsg = { message: string; statusText: string; data: string };

const ErrorPage = () => {
  const error = useRouteError() as ErrorMsg;

  console.log('error', error);

  return (
    <div className="flex justify-center mt-4 text-4xl">
      <p>
        <i>{error.data || error.message || error.statusText}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
