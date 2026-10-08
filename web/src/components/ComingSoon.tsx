function ComingSoon({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="mx-auto max-w-3xl scroll-mt-16 px-5 py-20 text-center">
      <h1 className="text-2xl font-medium text-text">{title}</h1>
      <p className="mt-2 text-muted">Coming soon.</p>
    </section>
  );
}

export default ComingSoon;
