import profilePhoto from '../assets/profile.jpg';

function Home() {
  return (
    <section
      id="home"
      className="mx-auto grid w-[90%] min-h-[calc(100svh-80px)] scroll-mt-20 grid-cols-1 items-center gap-10 py-12 md:w-[70%] md:grid-cols-[3fr_2fr] md:gap-40"
    >
      <div className="flex flex-col items-start gap-6 text-left">
        <p className="text-sm font-bold tracking-[0.06em] text-accent uppercase">
          Welcome to my portfolio
        </p>
        <h1 className="font-serif text-[clamp(40px,6vw,72px)] leading-[0.98] font-medium text-text">
          Software Engineer building reliable, scalable systems.
        </h1>
        <span className="rounded-full border border-line-strong px-4 py-1.5 text-xs font-semibold text-text sm:px-5 sm:py-2 sm:text-sm">
          Tareq Abuhashish / Software Engineer
        </span>
        <p className="max-w-md text-[clamp(16px,1.4vw,18px)] leading-[1.55] text-muted">
          Clean APIs. Solid data. Built to scale.
        </p>
        <nav className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="rounded-full bg-btn-solid px-6 py-3 font-bold text-on-btn-solid"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line-strong px-6 py-3 font-bold text-text"
          >
            Get in touch
          </a>
          <a
            href="/cv/tareq-abuhashish-cv.pdf"
            download
            className="rounded-full border border-line-strong px-6 py-3 font-bold text-text"
          >
            Download CV
          </a>
        </nav>
      </div>

      <img
        src={profilePhoto}
        alt="Tareq Abuhashish"
        className="mx-auto aspect-[3/4] w-full max-w-sm rounded-[70%_120%_70%_120%] border-[6px] border-surface object-cover"
      />
    </section>
  );
}

export default Home;
