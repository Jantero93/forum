import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AuthContext from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

import { useAuthHooks } from './contexts/AuthContext';

const App = () => {
  const { checkTokenExpiration } = useAuth();

  const { useAuthState, useUpdateAuthState } = useAuthHooks;

  const test = useAuthState();

  console.log('test', test);

  useEffect(() => {
    checkTokenExpiration();
  }, [checkTokenExpiration]);

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
