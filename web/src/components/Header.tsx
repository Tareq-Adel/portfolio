const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-center gap-6 border-b border-line bg-bg">
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} className="text-sm font-semibold text-muted">
          {link.label}
        </a>
      ))}
    </header>
  );
}

export default Header;
