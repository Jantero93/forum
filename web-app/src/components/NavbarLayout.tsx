import { Link } from 'react-router-dom';
import Logo from '../assets/WebSiteLogo.png';

type LayoutProps = {
  children: React.ReactNode;
};

const NavbarLayout = ({ children }: LayoutProps) => {
  const boards = ['Kissat', 'Koirat', 'Tietokoneet'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-700">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center rounded-lg cursor-pointer hover:bg-gray-700">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <ul className="pt-10 space-y-2 font-medium">
            {boards.map((board) => (
              <li key={board}>
                <Link
                  className="flex items-center p-2 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-purple-300"
                  to={board}
                >
                  <span className="flex-1 ml-3 text-xl font-medium whitespace-nowrap">
                    {board}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {children}
    </div>
  );
};

export default NavbarLayout;
