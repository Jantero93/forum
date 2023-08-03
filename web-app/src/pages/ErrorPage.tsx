import { useRouteError } from 'react-router-dom';

type ErrorMsg = { message: string; statusText: string; data: string };

type ErrorPageProps = { message: string };

const ErrorPage = ({ message }: ErrorPageProps) => {
  const error = useRouteError() as ErrorMsg;

  console.error('error', error);

  const errorMessageText = `Error: ${message} , try later again`;

  return (
    <div className="flex justify-center p-5 text-4xl">{errorMessageText}</div>
  );
};

export default ErrorPage;
