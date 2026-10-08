const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tareq-adel', external: true },
  { label: 'GitHub', href: 'https://github.com/Tareq-Adel', external: true },
  { label: 'Email', href: '#contact', external: false },
];

// Computed once at module load, not on every render.
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 text-center">
      <p className="font-semibold text-text">Tareq Abuhashish</p>
      <p className="text-sm text-muted">Software Engineer — Backend &amp; Node.js</p>
      <nav className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full border border-line-strong px-5 py-2 text-base font-semibold text-text hover:border-accent hover:text-accent"
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="mt-6 text-xs text-subtle">© {currentYear} Tareq Abuhashish</p>
    </footer>
  );
}

export default Footer;
