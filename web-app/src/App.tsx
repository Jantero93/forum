import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-stone-600">
        <Outlet />
      </div>
    </>
  );
};

export default App;
