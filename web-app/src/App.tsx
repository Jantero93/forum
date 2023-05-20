import { Outlet } from 'react-router-dom';
import NavbarLayout from './components/NavbarLayout';

const App = () => (
  <NavbarLayout>
    <Outlet />
  </NavbarLayout>
);

export default App;
