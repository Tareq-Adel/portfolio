# Portfolio Website — Requirements (v1)

> Status: Draft v0.1 · Owner: _you_ · Last updated: 2026-10-02
> This document is the single source of truth for scope. Architecture, design and tasks must trace back to it.

---

## 1. Purpose

A personal portfolio that presents me as a **full-stack web developer specializing in backend (Node.js)**.
The site is itself a portfolio piece: it runs on my own Node API, not only static pages.

## 2. Audience

| Audience | What they need | Primary action |
|---|---|---|
| Recruiters / hiring managers | Quick read of skills, experience, proof of work | Download CV, contact |
| Freelance clients | Trust, past results, how to hire me | Send a project inquiry |

Both audiences must reach the contact form within **one click** from any page.

## 3. Scope

### In scope (v1)
- **Home** — hero (name, role, one-line pitch), CTA buttons (Contact, Download CV), short highlights.
- **Projects** — list + detail pages (problem, my role, stack, architecture notes, links). _(Assumed — confirm.)_
- **About + Skills** — bio, tech stack grouped by area, experience timeline.
- **Blog** — list + post pages, tags, reading time.
- **Contact** — form (name, email, type: job / freelance / other, message) handled by the API.
- **Bilingual** — English and Arabic, full RTL layout for Arabic.

### Out of scope (v1 → v2 candidates)
- Admin dashboard / CMS UI (content managed via files or DB seed in v1)
- Comments on blog posts
- Newsletter
- Dark/light theme toggle (follow system preference only)

## 4. Functional requirements

### FR-1 Internationalization
- FR-1.1 Every page exists in `en` and `ar`; URL prefix `/en/...`, `/ar/...`.
- FR-1.2 Language switcher on every page keeps the user on the equivalent page.
- FR-1.3 Arabic renders RTL (`dir="rtl"`), including layout mirroring.
- FR-1.4 Default language detected from `Accept-Language`, fallback `en`.
- FR-1.5 Blog posts may exist in one language only; the switcher hides or disables the missing version.

### FR-2 Projects
- FR-2.1 Projects list with title, short summary, stack tags, thumbnail.
- FR-2.2 Filter by stack tag.
- FR-2.3 Detail page: problem, role, stack, key decisions, outcome, repo/live links.
- FR-2.4 Projects can be marked `featured` to appear on Home.

### FR-3 About + Skills
- FR-3.1 Bio (bilingual).
- FR-3.2 Skills grouped (Backend, Frontend, Databases, DevOps, Tools).
- FR-3.3 Experience timeline (role, company, dates, highlights).
- FR-3.4 Downloadable CV (PDF, per language if available).

### FR-4 Blog
- FR-4.1 Posts authored in Markdown/MDX with frontmatter (title, date, tags, lang, summary).
- FR-4.2 Post list with pagination and tag filter.
- FR-4.3 Code blocks with syntax highlighting.
- FR-4.4 Reading time, published date, per-post SEO metadata.
- FR-4.5 RSS feed per language.

### FR-5 Contact (Node API)
- FR-5.1 `POST /api/contact` validates input server-side (schema validation).
- FR-5.2 Stores the message in the database.
- FR-5.3 Sends me an email notification.
- FR-5.4 Spam protection: rate limiting per IP + honeypot field (+ optional captcha).
- FR-5.5 User sees clear success / error state in their language.

### FR-6 API (general)
- FR-6.1 Content endpoints: `GET /api/projects`, `GET /api/projects/:slug`, `GET /api/health`.
- FR-6.2 Consistent JSON error format and HTTP status codes.
- FR-6.3 Structured logging and request IDs.
- FR-6.4 API documented (OpenAPI).

## 5. Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-1 | Performance | Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO (mobile) |
| NFR-2 | Performance | LCP < 2.5s on 4G; API p95 < 300ms |
| NFR-3 | Accessibility | WCAG 2.1 AA; keyboard navigable; proper contrast in both languages |
| NFR-4 | SEO | Per-page meta, Open Graph, `hreflang` en/ar, sitemap.xml, robots.txt |
| NFR-5 | Responsive | Mobile-first; works from 320px wide |
| NFR-6 | Security | HTTPS, security headers (CSP, HSTS), input validation, secrets in env vars, no PII in logs |
| NFR-7 | Reliability | Health check endpoint; uptime monitoring; error tracking |
| NFR-8 | Quality | TypeScript everywhere; lint + format in CI; tests for API (unit + integration) |
| NFR-9 | Cost | Hosting within free/low tier (target < $10/month) |
| NFR-10 | Privacy | Privacy-friendly analytics, no tracking cookies without consent |

## 6. Constraints & assumptions
- Main stack: Node.js + TypeScript (details decided in `ARCHITECTURE.md`).
- Built step by step with AI agents; every task references requirement IDs (e.g. "implements FR-5.1").
- Content (projects, blog) written by me; Arabic content written or reviewed by me, not machine-only.

## 7. Success criteria (v1 done when…)
- [ ] All FR items above implemented in both languages
- [ ] NFR-1 to NFR-6 verified (Lighthouse report + security headers check)
- [ ] Deployed on a custom domain with HTTPS
- [ ] Contact form tested end to end (message stored + email received)
- [ ] At least 3 projects and 1 blog post published

## 8. Open questions
1. Include a Projects section? (Not selected in discovery — assumed yes, since it's the core of a portfolio.)
2. Domain name?
3. Which 3–5 projects to feature first?
4. CV available in Arabic too, or English only?
5. Email provider for notifications (e.g. Resend, SendGrid, SMTP)?
