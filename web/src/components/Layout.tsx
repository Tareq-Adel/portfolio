import { NavLink, Outlet } from 'react-router';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-16 items-center justify-center gap-6 border-b border-line">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `text-sm font-semibold ${isActive ? 'text-accent' : 'text-muted'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
