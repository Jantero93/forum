import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContextProvider';
import Navbar from './components/navbar/Navbar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const { checkTokenExpiration } = useAuthContext();

  useEffect(() => {
    checkTokenExpiration();
  }, [location, checkTokenExpiration]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-800">
        <Navbar />
        <Outlet />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </>
  );
};

export default App;
