import { useRouteError } from 'react-router-dom';

type ErrorMsg = { message: string; statusText: string };

const ErrorPage = () => {
  const error = useRouteError() as ErrorMsg;

  return (
    <div className="m-4 text-4xl">
      <p>
        <i>{error.message || error.statusText}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
