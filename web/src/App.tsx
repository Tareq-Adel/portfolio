function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="text-sm font-bold tracking-[0.06em] text-accent uppercase">Tareq Abuhashish</p>
      <h1 className="text-[clamp(36px,4.4vw,56px)] leading-[1.08] font-medium text-text">
        Backend Software Engineer building reliable systems with Node.js and TypeScript.
      </h1>
      <p className="max-w-xl text-[clamp(18px,1.6vw,21px)] leading-[1.55] text-muted">
        {/* Sub-headline: CONTENT.md leaves this as an open choice (A/B/C) — using option A as a
            placeholder until it's confirmed. */}
        I design the parts of software you don't see: clean APIs, solid data models, and
        architecture built to grow.
      </p>
      <nav className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-full bg-btn-solid px-6 py-3 font-bold text-on-btn-solid"
        >
          View my work
        </button>
        <button
          type="button"
          className="rounded-full border border-line-strong px-6 py-3 font-bold text-text"
        >
          Get in touch
        </button>
        <button
          type="button"
          className="rounded-full border border-line-strong px-6 py-3 font-bold text-text"
        >
          Download CV
        </button>
      </nav>
    </main>
  );
}

export default App;
