import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

const inquiryTypes = [
  { value: 'job', label: 'Job opportunity' },
  { value: 'freelance', label: 'Freelance project' },
  { value: 'other', label: 'Other' },
] as const;

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Tareq-Adel',
    icon: (
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.97.01 1.95.13 2.87.39 2.19-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tareq-adel-15ab19246/',
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tareq_ab7shish/',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    outline: true,
  },
];

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; requestId: string }
  | { kind: 'error'; message: string; fields?: Record<string, string> };

function Contact() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus({ kind: 'submitting' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          inquiryType: data.get('inquiryType'),
          message: data.get('message'),
          locale: 'en',
          website: data.get('hp_field'),
        }),
      });

      const body = await response.json();

      if (response.ok) {
        setStatus({ kind: 'success', requestId: body.requestId });
        form.reset();
        return;
      }

      if (body.code === 'VALIDATION_FAILED') {
        const fields: Record<string, string> = {};
        for (const detail of body.details ?? []) {
          fields[detail.field] = detail.issue;
        }
        setStatus({ kind: 'error', message: body.message, fields });
        return;
      }

      setStatus({ kind: 'error', message: body.message ?? 'Something went wrong.' });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Could not reach the server. Check your connection and try again.',
      });
    }
  }

  return (
    <section id="contact" className="mx-auto w-[90%] scroll-mt-20 py-20 md:w-[70%]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left: intro + contact info + social links */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-bold tracking-[0.1em] text-accent uppercase">
              Get in touch
            </span>
          </div>
          <h2 className="mt-6 font-serif text-[clamp(32px,4vw,48px)] leading-[1.05] font-medium text-text">
            Let's Work Together
          </h2>
          <p className="mt-6 max-w-md leading-[1.65] text-muted">
            Have a role, a project, or a question in mind? I'd love to hear from you.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a href="mailto:tareq212adel@gmail.com" className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-chip text-accent">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </span>
              <span>
                <span className="block text-xs text-subtle">Email</span>
                <span className="block text-sm font-semibold text-text-2">
                  tareq212adel@gmail.com
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-chip text-accent">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>
                <span className="block text-xs text-subtle">Location</span>
                <span className="block text-sm font-semibold text-text-2">Gaza, Palestine</span>
              </span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-text">Follow me</p>
            <div className="mt-3 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-chip text-text-2 hover:text-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill={social.outline ? 'none' : 'currentColor'}
                    stroke={social.outline ? 'currentColor' : undefined}
                    strokeWidth={social.outline ? 2 : undefined}
                    strokeLinecap={social.outline ? 'round' : undefined}
                    strokeLinejoin={social.outline ? 'round' : undefined}
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: the form, as a card */}
        <div className="rounded-[24px] border border-card-line bg-surface p-6 sm:p-8">
          <h3 className="text-xl font-bold text-text">Send a Message</h3>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" noValidate>
            {/* Honeypot: hidden from people, must stay empty. Bots that fill every field trip
                this. Field name deliberately avoids words like "website"/"url"/"company" --
                those trigger browser autofill even on a visually hidden, off-screen field,
                which caused real users' submissions to silently fail. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="hp_field">Leave this field empty</label>
              <input type="text" id="hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-text">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="John Doe"
                  className="h-12 rounded-[10px] border border-input-line bg-bg px-4 text-text placeholder:text-subtle"
                />
                {status.kind === 'error' && status.fields?.name && (
                  <p className="text-sm text-error">At least 2 characters.</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-text">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  placeholder="john@example.com"
                  className="h-12 rounded-[10px] border border-input-line bg-bg px-4 text-text placeholder:text-subtle"
                />
                {status.kind === 'error' && status.fields?.email && (
                  <p className="text-sm text-error">Please enter a valid email address.</p>
                )}
              </div>
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-semibold text-text">What's this about?</legend>
              <div className="flex flex-wrap gap-2">
                {inquiryTypes.map((type) => (
                  <label key={type.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="inquiryType"
                      value={type.value}
                      defaultChecked={type.value === 'other'}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-line-strong px-4 py-2 text-sm text-text peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent-soft-text">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-text">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                placeholder="Tell me about your project or idea..."
                className="rounded-[10px] border border-input-line bg-bg px-4 py-3 text-text placeholder:text-subtle"
              />
              {status.kind === 'error' && status.fields?.message && (
                <p className="text-sm text-error">
                  Please write a bit more (at least 10 characters).
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status.kind === 'submitting'}
              className="flex items-center justify-center gap-2 rounded-full bg-btn-solid px-6 py-3 font-bold text-on-btn-solid disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              {status.kind === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>

            {status.kind === 'success' && (
              <p role="status" className="text-center text-sm text-accent">
                Message sent. Reference: {status.requestId}
              </p>
            )}
            {status.kind === 'error' && (
              <p role="alert" className="text-center text-sm text-error">
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
