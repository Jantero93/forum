import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

const App = () => (
  <>
    <div className="flex min-h-screen bg-gray-800">
      <Navbar />
      <Outlet />
    </div>
  </>
);

export default App;
