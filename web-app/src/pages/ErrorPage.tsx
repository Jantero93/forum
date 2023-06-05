import { useRouteError } from 'react-router-dom';
import NavbarLayout from '~/components/navbar/NavbarLayout';

type ErrorMsg = { message: string; statusText: string; data: string };

const ErrorPage = () => {
  const error = useRouteError() as ErrorMsg;

  return (
    <NavbarLayout>
      <div className="flex text-4xl text-purple-300">
        <p>
          <i>{error.data || error.message || error.statusText}</i>
        </p>
      </div>
    </NavbarLayout>
  );
};

export default ErrorPage;
