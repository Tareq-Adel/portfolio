const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tareq-adel-15ab19246/', external: true },
  { label: 'GitHub', href: 'https://github.com/Tareq-Adel', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/tareq_ab7shish/', external: true },
  { label: 'Email', href: '#contact', external: false },
];

// Computed once at module load, not on every render.
const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="border-t border-line py-10 text-center">
      <div className="mx-auto w-[90%] md:w-[70%]">
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
      </div>
    </footer>
  );
}

export default Footer;
