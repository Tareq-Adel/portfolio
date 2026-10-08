import { useEffect, useState } from 'react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

function Header() {
  const [activeId, setActiveId] = useState('home');

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

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-center gap-6 border-b border-line bg-bg">
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`text-sm font-semibold ${activeId === link.id ? 'text-accent' : 'text-muted'}`}
        >
          {link.label}
        </a>
      ))}
    </header>
  );
}

export default Header;
