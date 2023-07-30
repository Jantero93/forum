import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './contexts/AuthContextProvider';

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
      </div>
    </>
  );
};

export default App;
