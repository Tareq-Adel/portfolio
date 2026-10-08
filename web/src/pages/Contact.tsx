import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

const inquiryTypes = [
  { value: 'job', label: 'Job opportunity' },
  { value: 'freelance', label: 'Freelance project' },
  { value: 'other', label: 'Other' },
] as const;

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
    <section id="contact" className="mx-auto max-w-xl scroll-mt-16 px-5 py-20">
      <h1 className="text-center text-2xl font-medium text-text">Contact</h1>
      <p className="mt-2 text-center text-muted">
        Have a role, a project, or a question? Send a message below.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5" noValidate>
        {/* Honeypot: hidden from people, must stay empty. Bots that fill every field trip
            this. Field name deliberately avoids words like "website"/"url"/"company" --
            those trigger browser autofill even on a visually hidden, off-screen field,
            which caused real users' submissions to silently fail. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="hp_field">Leave this field empty</label>
          <input type="text" id="hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-text">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            className="h-12 rounded-[10px] border border-input-line bg-surface px-4 text-text"
          />
          {status.kind === 'error' && status.fields?.name && (
            <p className="text-sm text-error">Please enter your name (at least 2 characters).</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-text">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            className="h-12 rounded-[10px] border border-input-line bg-surface px-4 text-text"
          />
          {status.kind === 'error' && status.fields?.email && (
            <p className="text-sm text-error">Please enter a valid email address.</p>
          )}
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
            className="rounded-[10px] border border-input-line bg-surface px-4 py-3 text-text"
          />
          {status.kind === 'error' && status.fields?.message && (
            <p className="text-sm text-error">Please write a bit more (at least 10 characters).</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className="rounded-full bg-btn-solid px-6 py-3 font-bold text-on-btn-solid disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.kind === 'submitting' ? 'Sending…' : 'Send message'}
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
    </section>
  );
}

export default Contact;
