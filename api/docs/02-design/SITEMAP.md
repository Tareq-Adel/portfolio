# Sitemap and URL Structure

> Stage 2 · Detailed design · v0.1 · 2026-10-02
> Inputs: Software Specification (FR, US, ENT), UI design canvas. Feeds: `openapi.yaml`, frontend routing, SEO.

The site has 9 public page types, each served in two locales under `/en` and `/ar`, plus 7 API endpoints under `/api/v1`. Pages are pre-rendered; only the contact form calls the API at runtime.

---

## 1. URL rules

| Rule | Detail |
|---|---|
| Locale prefix | Every page lives under `/en/...` or `/ar/...` (FR-1.1). No unprefixed content URLs. |
| Root | `/` redirects (307) to `/en` or `/ar` from `Accept-Language`, default `/en` (FR-1.4). |
| Slugs | Lowercase, hyphenated, ASCII, unique per entity, identical in both locales (`/en/projects/coral-store` ↔ `/ar/projects/coral-store`). |
| Trailing slash | None. `/en/about/` → 308 to `/en/about`. |
| Language switch | Swaps only the prefix, so the visitor stays on the same page (FR-1.2). |
| Missing translation | A blog post in one language only: the switcher is disabled on that page (FR-1.5); the other locale's URL returns 404. |
| `hreflang` | Every page emits `en`, `ar` and `x-default` (→ `en`) alternates (NFR-4). |
| `dir` | `/ar/*` pages render `<html lang="ar" dir="rtl">` (FR-1.3). |

## 2. Pages

`{lang}` = `en` or `ar`. Rendering: **SSG** = built at deploy; **ISR** = static, refreshed by on-demand revalidation when content changes.

| ID | URL | Page | Rendering | Data source | Covers |
|---|---|---|---|---|---|
| P-01 | `/` | Locale redirect | Edge redirect | `Accept-Language` | FR-1.4, US-06 |
| P-02 | `/{lang}` | Home | ISR | `GET /profile`, `GET /projects?featured=true` | FR-7.1, FR-2.4, FR-3.2, US-01 |
| P-03 | `/{lang}/projects` | Projects list + filter | ISR | `GET /projects`, `GET /technologies` | FR-2.1, FR-2.2, US-04 |
| P-04 | `/{lang}/projects/{slug}` | Project case study | ISR | `GET /projects/{slug}` | FR-2.3, US-05 |
| P-05 | `/{lang}/about` | About, skills, experience, education, CV | ISR | `GET /profile`, `GET /technologies`, `GET /experience` | FR-3.1–3.4, US-02, US-03 |
| P-06 | `/{lang}/blog` and `/{lang}/blog/page/{n}` | Blog list, 10 per page | SSG | MDX files | FR-4.2, US-10 |
| P-07 | `/{lang}/blog/tags/{tag}` | Posts by tag | SSG | MDX files | FR-4.2, US-10 |
| P-08 | `/{lang}/blog/{slug}` | Blog post | SSG | MDX file | FR-4.1, FR-4.3, FR-4.4, US-09, US-14 |
| P-09 | `/{lang}/contact` | Contact form | SSG + client POST | `POST /contact` | FR-5.1–5.5, US-07, US-08 |
| P-10 | `/{lang}/404` | Not found | SSG | — | — |

**Theme:** every page follows the system light/dark setting on first visit and offers a manual toggle (FR-7.3, proposed for v1); the choice is stored in a cookie-free `localStorage` key and applied before paint.

## 3. Files and feeds

| URL | Content | Covers |
|---|---|---|
| `/{lang}/rss.xml` | RSS 2.0 feed of posts in that locale | FR-4.5 |
| `/sitemap.xml` | All pages, both locales, with `xhtml:link` alternates | NFR-4 |
| `/robots.txt` | Allow all; points to sitemap; disallows `/api/` | NFR-4 |
| `/cv/tareq-abuhashish-cv.pdf` | English CV, linked from both locales (Q-4 resolved) | FR-3.4 |
| `/og/{page}.png` | Open Graph images, generated at build | FR-4.4, NFR-4 |

## 4. API endpoints (detail in `openapi.yaml`)

| ID | Method and path | Used by |
|---|---|---|
| API-01 | `GET /api/v1/health` | Uptime monitor |
| API-02 | `GET /api/v1/profile` | P-02, P-05 (and the API card on Home) |
| API-03 | `GET /api/v1/projects` | P-02, P-03 |
| API-04 | `GET /api/v1/projects/{slug}` | P-04 |
| API-05 | `GET /api/v1/technologies` | P-03, P-05 |
| API-06 | `GET /api/v1/experience` | P-05 |
| API-07 | `POST /api/v1/contact` | P-09 |
| — | `GET /api/docs` | Public OpenAPI viewer (FR-6.4, US-11) |

## 5. Navigation

- **Header (every page):** logo → Home · Projects · About · Blog · language switch · theme toggle · Contact (primary button). Contact is one click from every page (FR-7.2, US-13).
- **Footer (every page):** name and title · LinkedIn · GitHub (Q-5) · Email (→ Contact) · RSS.
- **Breadcrumbs:** on P-04 and P-08 only.
- **Mobile (< 768 px):** header links collapse into a menu button; Contact and the theme toggle stay visible.

## 6. Story-to-screen map (Stage 2 gate)

Every user story maps to at least one page and, where data is involved, an endpoint.

| Story | Page(s) | Endpoint(s) |
|---|---|---|
| US-01 Recruiter sees role and actions | P-02 | API-02, API-03 |
| US-02 Download CV | P-02, P-05 | static file |
| US-03 Read experience timeline | P-05 | API-06 |
| US-04 Browse and filter projects | P-03 | API-03, API-05 |
| US-05 Read a case study | P-04 | API-04 |
| US-06 Whole site in Arabic | all pages, P-01 | `lang` param on API-02–06 |
| US-07 Send an inquiry | P-09 | API-07 |
| US-08 Spam blocked | P-09 | API-07 (429, honeypot) |
| US-09 Read post with highlighted code | P-08 | — (MDX) |
| US-10 Browse by tag, RSS | P-06, P-07, `rss.xml` | — (MDX) |
| US-11 Inspect API docs | `/api/docs` | all |
| US-12 Consistent errors and logs | — | all (error schema, `X-Request-Id`) |
| US-13 Contact from any page | header, all pages | — |
| US-14 Single-language post | P-08 | — |

Result: 14 of 14 stories mapped.
