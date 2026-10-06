# Portfolio Project — Documentation Index

> Status as of 2026-10-03 · Owner: Tareq Abuhashish
> Everything produced so far, in process order. Put this folder at the root of the repo as `/docs`.

## Where we are

| Stage | Status | Gate |
|---|---|---|
| 1. Requirements, Analysis and Architecture | Draft v0.2, nearly complete | **Not passed** — open questions Q-2, Q-3, Q-5, Q-6, Q-7 |
| 2. Detailed design | Done (v0.1) | **Passed** — 14/14 stories mapped, 6/6 entities stored, all endpoints have error cases, all colors pass AA |
| 3. Planning | Not started | Needs launch date (Q-3) and weekly hours |
| 4–7. Build, Test, Deploy, Maintain | Not started | — |

## Pending change (decide before Stage 3)

**Database → JSON files.** Proposed on 2026-10-03: store projects, skills, experience and profile as JSON files instead of PostgreSQL. Waiting on one decision: how contact messages are handled.

1. Email only, no storage (recommended)
2. JSON for content + small free database for messages
3. No API; static site + form service

Once decided: new ADR-007 supersedes ADR-004, FR-5.3 and NFR-10 change, `DB_SCHEMA.md` is replaced by `CONTENT_MODEL.md`, and `openapi.yaml` is adjusted.

## Files

| File | Stage | What it is |
|---|---|---|
| `PROCESS.md` | — | The 7-stage process, each stage's inputs, outputs and gate |
| `00-content/CONTENT.md` | 1 (content) | Site copy from the CV: hero, bios, experience, education, skills |
| `01-foundation/REQUIREMENTS-v0.1-superseded.md` | 1 | First requirements draft, kept for history; replaced by the Software Specification |
| **Software Specification** (online doc) | 1 | The current Stage 1 document: requirements, user stories, domain model, architecture, ADRs, risks, traceability. Open it from the chat and download it as Markdown, Word or PDF |
| `02-design/SITEMAP.md` | 2 | Pages and URLs in `/en` and `/ar`, rendering, story-to-screen map |
| `02-design/openapi.yaml` | 2 | API contract: 7 endpoints, schemas, every error case |
| `02-design/DB_SCHEMA.md` | 2 | PostgreSQL schema and ERD — **likely to be replaced** (see pending change) |
| `02-design/DESIGN_SYSTEM.md` | 2 | Black + emerald tokens for both themes, type, motion, components, RTL and accessibility rules |
| **Portfolio UI Design** (online canvas) | 2 | Clickable design of all pages; open it from the chat |

## Decisions log

| Date | Decision |
|---|---|
| 2026-10-02 | Audience: recruiters and freelance clients |
| 2026-10-02 | Front end + own Node.js API; English and Arabic (RTL) |
| 2026-10-02 | Requirements, analysis and architecture merged into one stage |
| 2026-10-02 | CV: English only (Q-4 resolved) |
| 2026-10-02 | Featured projects: chosen later (Q-1 deferred to before Stage 4) |
| 2026-10-02 | Visual direction: black + deep emerald, wave hero, dark mode default, light/dark toggle in v1 |
| 2026-10-03 | Proposed: JSON files instead of a database (pending message decision) |

## Still needed from you

- GitHub URL (Q-5)
- Launch date (Q-3) and hours per week
- Domain name, or "decide in Stage 6" (Q-2)
- Sahab achievements and Areisto stack (Q-6)
- Mentor review of the stack (Q-7)
- Contact messages option: 1, 2 or 3
- Profile photo
