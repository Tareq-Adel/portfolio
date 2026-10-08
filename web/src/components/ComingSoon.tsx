function ComingSoon({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 text-center">
      <h1 className="text-2xl font-medium text-text">{title}</h1>
      <p className="mt-2 text-muted">Coming soon.</p>
    </main>
  );
}

export default ComingSoon;
