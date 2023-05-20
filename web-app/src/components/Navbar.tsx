import Logo from '../assets/WebSiteLogo.png';

const Navbar = () => {
  const boards = ['Kissat', 'Koirat', 'Tietokoneet'];

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
        <div className="flex items-center hover:bg-gray-700 rounded-lg cursor-pointer">
          <img src={Logo} alt="logo" />
        </div>
        <ul className="space-y-2 font-medium pt-10">
          {boards.map((board) => (
            <li key={board}>
              <a className="flex items-center p-2 text-gray-200 rounded-lg  hover:bg-gray-700 hover:text-purple-300 cursor-pointer">
                <span className="flex-1 text-xl font-medium ml-3 whitespace-nowrap">
                  {board}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;
