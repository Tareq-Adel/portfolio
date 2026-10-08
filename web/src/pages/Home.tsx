import { Link } from 'react-router';

import profilePhoto from '../assets/profile.jpg';

function Home() {
  return (
    <main className="mx-auto grid min-h-[calc(100svh-64px)] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-12 md:grid-cols-2 md:gap-40">
      <div className="flex flex-col items-start gap-6 text-left">
        <p className="text-sm font-bold tracking-[0.06em] text-accent uppercase">
          Welcome to my portfolio
        </p>
        <h1 className="font-serif text-[clamp(40px,6vw,72px)] leading-[0.98] font-medium text-text">
          Backend Engineer building reliable, scalable systems.
        </h1>
        <span className="rounded-full border border-line-strong px-5 py-2 text-sm font-semibold text-text">
          Tareq Abuhashish / Software Engineer
        </span>
        <p className="max-w-md text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-muted">
          Clean APIs. Solid data. Built to scale.
        </p>
        <nav className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="rounded-full bg-btn-solid px-6 py-3 font-bold text-on-btn-solid"
          >
            View my work
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-line-strong px-6 py-3 font-bold text-text"
          >
            Get in touch
          </Link>
          {/* No CV file exists yet (FR-3.4) -- not a real link until one is published. */}
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-full border border-line-strong px-6 py-3 font-bold text-subtle"
          >
            Download CV
          </button>
        </nav>
      </div>

      <img
        src={profilePhoto}
        alt="Tareq Abuhashish"
        className="mx-auto aspect-[3/4] w-full max-w-sm rounded-[70%_120%_70%_120%] border-[6px] border-surface object-cover"
      />
    </main>
  );
}

export default Home;
