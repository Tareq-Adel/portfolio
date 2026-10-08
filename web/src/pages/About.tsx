const skillGroups = [
  { name: 'Backend', skills: ['Node.js', 'TypeScript', 'NestJS', 'Express', 'RESTful API design'] },
  { name: 'Databases', skills: ['PostgreSQL', 'MongoDB', 'schema design', 'query optimization'] },
  { name: 'Architecture', skills: ['Domain-Driven Design', 'Layered Architecture', 'MVC'] },
  { name: 'Frontend', skills: ['React', 'JavaScript'] },
  { name: 'Other languages', skills: ['Java', 'Python', 'C', 'C++', 'Rust'] },
  { name: 'Systems', skills: ['Assembly', 'memory management', 'CPU architecture', 'OS concepts'] },
  {
    name: 'Professional',
    skills: ['Technical documentation', 'problem solving', 'collaboration', 'project management'],
  },
];

const experience = [
  {
    role: 'Software Engineering Trainee — Areisto',
    dates: 'Apr 2025 – Jul 2025 · Gaza, Palestine',
    highlights: [
      'Built backend services and data-management modules for enterprise applications, including a task distribution system for organizations.',
      'Structured the codebase with MVC and Domain-Driven Design to keep business logic isolated, testable, and ready to scale.',
      'Completed the Graduates Empowerment Program – Season 2 (Capable track): a 90-hour Full Stack Node.js training.',
    ],
  },
  {
    role: 'Software Engineer — Sahab Company',
    dates: '2023 – 2024 · Gaza, Palestine',
    highlights: [
      'Designed, developed, and maintained software solutions across multiple domains, working on both frontend and backend.',
      'Applied software engineering practices throughout the lifecycle, from design to maintenance.',
    ],
  },
  {
    role: 'IT Volunteer — Maghazi Community Rehabilitation Society',
    dates: '2024 · Gaza, Palestine',
    highlights: [
      'Supported the development of data-collection and reporting tools that streamlined how programs track their work.',
      'Trained staff in core digital tools, helping the team manage beneficiary and program information more effectively.',
    ],
  },
  {
    role: 'Full-Stack Bootcamp Graduate — Gaza Sky Geeks',
    dates: 'Oct 2022 · Gaza, Palestine',
    highlights: [
      'Completed intensive training in full-stack web development with JavaScript and Node.js.',
      'Built and deployed team projects using agile workflows.',
    ],
  },
];

function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-16 px-5 py-16">
      <div>
        <h1 className="text-2xl font-medium text-text">About</h1>
        <p className="mt-6 text-lg leading-[1.65] text-text-2">
          I'm Tareq, a software engineer who enjoys the part of software that holds everything
          together: the APIs, the data, and the architecture underneath.
        </p>
        <p className="mt-4 leading-[1.65] text-muted">
          I started building for the web in 2022 at the Gaza Sky Geeks bootcamp, working in teams to
          ship full-stack JavaScript and Node.js projects. Since then I've worked as a software
          engineer at Sahab Company, contributing across the frontend and backend of production
          applications, and as a backend trainee at Areisto, where I built services and
          data-management modules for enterprise systems using MVC and Domain-Driven Design.
        </p>
        <p className="mt-4 leading-[1.65] text-muted">
          I graduated in April 2025 with a BSc in Software Engineering from Al-Azhar University –
          Gaza. My studies went deep into the foundations, from operating systems and compilers to
          distributed and cloud computing, and that shapes how I work: I like understanding{' '}
          <em>why</em> a system behaves the way it does before deciding how to build it. My
          graduation project, CORAL Store, was a full e-commerce platform designed to be scalable
          and secure from the ground up.
        </p>
        <p className="mt-4 leading-[1.65] text-muted">
          Today I focus on backend engineering with Node.js, NestJS, and PostgreSQL, and on writing
          software that the next engineer will be glad to inherit.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-medium text-text">Skills</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.name}
              className="rounded-[24px] border border-card-line p-4 transition duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:hover:border-accent motion-safe:hover:shadow-lg"
            >
              <h3 className="text-sm font-bold text-accent">{group.name}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-chip px-3 py-1 text-sm text-text-2">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-medium text-text">Experience</h2>
        <ol className="mt-6 space-y-8 border-s-2 border-line ps-6">
          {experience.map((item) => (
            <li key={item.role}>
              <h3 className="font-semibold text-text">{item.role}</h3>
              <p className="text-sm text-subtle">{item.dates}</p>
              <ul className="mt-2 list-disc space-y-1 ps-5 text-muted">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-medium text-text">Education</h2>
        <div className="mt-6">
          <h3 className="font-semibold text-text">
            BSc in Software Engineering — Al-Azhar University, Gaza
          </h3>
          <p className="text-sm text-subtle">Oct 2020 – Apr 2025 · Second Class Honours (85.19%)</p>
          <p className="mt-2 text-muted">
            Graduation project: CORAL Store, an e-commerce platform designed for a scalable, secure,
            and seamless shopping experience.
          </p>
          <p className="mt-2 text-muted">
            Key modules: Advanced Software Engineering, Advanced Software Design, Distributed &amp;
            Cloud Computing, Web Engineering, Information Security, Data Structures &amp;
            Algorithms, Operating Systems, Compiler Design.
          </p>
        </div>
      </section>

      <section className="mt-16 text-center">
        <a
          href="/cv/tareq-abuhashish-cv.pdf"
          download
          className="rounded-full border border-line-strong px-6 py-3 font-bold text-text"
        >
          Download CV
        </a>
      </section>
    </section>
  );
}

export default About;
