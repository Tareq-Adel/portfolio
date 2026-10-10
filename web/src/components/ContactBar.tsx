const links = [
  { label: 'Email', href: 'mailto:tareq212adel@gmail.com', external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tareq-adel-15ab19246/', external: true },
  { label: 'GitHub', href: 'https://github.com/Tareq-Adel', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/tareq_ab7shish/', external: true },
];

function ContactBar() {
  return (
    <div className="border-b border-line bg-chip py-3">
      <nav className="mx-auto flex w-[90%] flex-wrap items-center justify-center gap-3 md:w-[70%]">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full border border-transparent px-4 py-1.5 text-sm font-semibold text-text-2 transition duration-200 hover:border-accent-soft-line hover:bg-accent-soft hover:text-accent-soft-text"
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
