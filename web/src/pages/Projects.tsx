const projects = [
  {
    title: 'CORAL Store',
    type: 'Graduation project — built with a partner',
    summary:
      'A full e-commerce platform: product catalog, Stripe checkout, order management, and an admin dashboard.',
    problem:
      'The thesis goal was an e-commerce platform addressing the limitations of traditional retail with a scalable, secure, seamless shopping experience.',
    role: 'Bachelor thesis, co-built with a partner (mohanadft) -- backend and data layer.',
    decisions:
      'Sequelize + MySQL for relational product/order data, JWT + Passport for auth, Stripe for payments, Cloudinary for image hosting, Joi for request validation.',
    outcome:
      'Admin dashboard with analytics, Stripe checkout, order cancellation & refunds, and Google Maps integration on the frontend.',
    stack: ['Node.js', 'TypeScript', 'Express', 'Sequelize', 'MySQL', 'Stripe', 'React', 'MUI'],
  },
  {
    title: 'Git Branch CLI',
    type: 'Personal tool',
    summary: 'Interactive terminal tool for switching Git branches without memorizing names.',
    problem:
      'Typing out full branch names and running git checkout by hand is slow and error-prone, especially with long remote branch names.',
    role: 'Built solo, published as a global npm CLI.',
    decisions:
      'Hand-rolled the arrow-key terminal navigation instead of pulling in a prompt library. Remote branch checkout creates a properly tracked local branch instead of leaving the user in a detached HEAD.',
    outcome: 'A global `mycheck` command that works in any local git repository.',
    stack: ['Node.js', 'TypeScript', 'chalk'],
  },
  {
    title: 'ARSL — Hospital Patient Platform',
    type: 'Client project',
    summary: 'A platform for a hospital to provide medical services and support patients remotely.',
    problem:
      'Patients needed a way to reach the hospital without an in-person visit for every question, consultation, or scheduling need.',
    role: 'Backend services (NestJS) powering patient chat, calls, and appointment booking, plus the React frontend.',
    decisions: null,
    outcome:
      'Patients can message and call hospital staff directly, and view and book doctor appointments online.',
    stack: ['Node.js', 'NestJS', 'React'],
  },
  {
    title: 'Organization Task Distribution System',
    type: 'Professional project — Areisto',
    summary:
      'Backend services and data-management modules for distributing work across an organization.',
    problem:
      'Enterprise teams needed a structured way to assign and track tasks across the organization rather than managing it ad hoc.',
    role: 'Software Engineering Trainee, as part of the Graduates Empowerment Program – Season 2.',
    decisions:
      'Structured the codebase with MVC and Domain-Driven Design to keep business logic isolated, testable, and ready to scale.',
    outcome: null,
    stack: ['Node.js'],
  },
  {
    title: 'Problem Solving & Algorithms',
    type: 'Practice repository',
    summary: 'Solutions to a range of coding and algorithmic problems.',
    problem: null,
    role: null,
    decisions: null,
    outcome: null,
    stack: ['JavaScript', 'TypeScript', 'Java', 'Rust', 'Python'],
  },
];

function Projects() {
  return (
    <section id="projects" className="mx-auto w-[90%] scroll-mt-20 py-16 md:w-[85%]">
      <h2 className="text-2xl font-medium text-text">Projects</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-[24px] border border-card-line bg-surface p-6 transition duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:hover:border-accent motion-safe:hover:shadow-lg"
          >
            <p className="text-xs font-bold tracking-[0.06em] text-accent uppercase">
              {project.type}
            </p>
            <h3 className="mt-2 font-serif text-xl font-medium text-text">{project.title}</h3>
            <p className="mt-2 text-sm leading-[1.6] text-text-2">{project.summary}</p>

            {project.problem && (
              <p className="mt-4 text-sm leading-[1.6] text-muted">
                <span className="font-semibold text-text-2">Problem — </span>
                {project.problem}
              </p>
            )}
            {project.role && (
              <p className="mt-2 text-sm leading-[1.6] text-muted">
                <span className="font-semibold text-text-2">Role — </span>
                {project.role}
              </p>
            )}
            {project.decisions && (
              <p className="mt-2 text-sm leading-[1.6] text-muted">
                <span className="font-semibold text-text-2">Decisions — </span>
                {project.decisions}
              </p>
            )}
            {project.outcome && (
              <p className="mt-2 text-sm leading-[1.6] text-muted">
                <span className="font-semibold text-text-2">Outcome — </span>
                {project.outcome}
              </p>
            )}

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-chip px-3 py-1 font-mono text-xs text-text-2"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
