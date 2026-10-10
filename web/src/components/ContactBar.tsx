const links = [
  { label: 'Email', href: 'mailto:tareq212adel@gmail.com', external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tareq-adel-15ab19246/', external: true },
  { label: 'GitHub', href: 'https://github.com/Tareq-Adel', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/tareq_ab7shish/', external: true },
];

function ContactBar() {
  return (
    <div className="border-b border-line bg-chip px-10 py-2">
      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs font-semibold text-muted hover:text-accent"
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default ContactBar;
