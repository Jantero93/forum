import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { checkTokenExpiration } = useAuth();

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
