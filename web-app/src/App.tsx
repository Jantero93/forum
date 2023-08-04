import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '~/contexts/AuthContextProvider';
import CustomToastContainer from '~/components/ToastContainer';
import Navbar from '~/components/navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const { checkTokenExpiration } = useAuthContext();

  // Check token expiration on page change
  useEffect(() => {
    checkTokenExpiration();
  }, [location, checkTokenExpiration]);

  return (
    <div className="flex min-h-screen bg-gray-800">
      <Navbar />
      <Outlet />
      <CustomToastContainer />
    </div>
  );
};

export default App;
