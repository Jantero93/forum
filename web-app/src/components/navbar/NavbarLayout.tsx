type LayoutProps = {
  children: React.ReactNode;
};

const NavbarLayout = ({ children }: LayoutProps) => (
  <main className="flex-grow p-4 bg-slate-700">{children}</main>
);

export default NavbarLayout;
