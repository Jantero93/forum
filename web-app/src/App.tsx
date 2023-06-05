import { Outlet } from 'react-router-dom';
import NavbarLayout from './components/navbar/NavbarLayout';

const App = () => (
  <NavbarLayout>
    <Outlet />
  </NavbarLayout>
);

export default App;
