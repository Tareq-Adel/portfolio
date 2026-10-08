import { useEffect, useState } from 'react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

function Header() {
  const [activeId, setActiveId] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      // 64px accounts for the sticky header; -60% keeps a section "active"
      // only while it's in the upper half of the viewport, not the instant
      // it first peeks in at the bottom.
      { rootMargin: '-64px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  function linkClass(id: string) {
    return `text-sm font-semibold ${activeId === id ? 'text-accent' : 'text-muted'}`;
  }

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg">
      <div className="flex h-16 items-center justify-between px-5 md:justify-center md:gap-6">
        {/* >=768px: every link inline, per DESIGN_SYSTEM.md's 768px breakpoint. */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={linkClass(link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* <768px: Contact stays visible, everything else collapses behind the menu button
            (SITEMAP.md section 5). */}
        <div className="flex w-full items-center justify-between md:hidden">
          <a href="#contact" className={linkClass('contact')}>
            Contact
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-5 bg-text transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-5 bg-text ${menuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-5 bg-text transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="flex flex-col items-center gap-4 border-t border-line py-4 md:hidden"
        >
          {navLinks
            .filter((link) => link.id !== 'contact')
            .map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={linkClass(link.id)}
              >
                {link.label}
              </a>
            ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
