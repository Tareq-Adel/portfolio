# Development Process

> How this project goes from idea to production. Every stage consumes the previous stage's output and produces an artifact the next stage depends on. No stage starts until the previous gate is passed.
> The same document is the instruction set for AI agents: each agent is given one stage, its inputs, and its exit criteria.

---

## Principles

1. **Artifacts, not memory.** Every decision lives in a file in `/docs`. If it isn't written, it isn't decided.
2. **Gates.** Each stage ends with a review against its exit criteria. Pass → baseline (tag the version) → next stage.
3. **Traceability.** Every item carries an ID and points to its parent: `FR-5.1 → US-07 → API-03 → T-21 → TC-14`. Nothing gets built that doesn't trace back to a requirement.
4. **Change control.** Changing a baselined artifact = log it in `CHANGELOG-DOCS.md`, bump the version, re-check downstream artifacts that reference it.
5. **Iterate, don't skip.** Problems found later loop back to the stage that owns them (a missing requirement goes back to Stage 1, not patched in code).

---

## Stage overview

| # | Stage | Input | Output (artifact) | Gate |
|---|---|---|---|---|
| 1 | Requirements, Analysis & Architecture | Discovery answers | `docs/01-foundation/REQUIREMENTS.md`, `USER_STORIES.md`, `DOMAIN_MODEL.md`, `ARCHITECTURE.md`, `adr/` | No open questions; every FR testable, covered by a story, and supported by the architecture |
| 2 | Detailed design | Stage 1 artifacts | `docs/02-design/openapi.yaml`, `DB_SCHEMA.md`, `SITEMAP.md`, wireframes, `DESIGN_SYSTEM.md` | Every story maps to an endpoint and/or screen |
| 3 | Planning | All design artifacts | `docs/03-planning/BACKLOG.md`, `MILESTONES.md`, `DEFINITION_OF_DONE.md` | Every story split into tasks ≤ 1 day; milestones dated |
| 4 | Implementation | Backlog + design | Code, PRs, `CONTRIBUTING.md` | Each task meets Definition of Done |
| 5 | Testing / QA | Stories (acceptance criteria) + code | `docs/05-testing/TEST_PLAN.md`, test reports, `TRACEABILITY.md` | All acceptance tests pass; NFR checks pass |
| 6 | Deployment | Tested build | CI/CD pipeline, `RUNBOOK.md`, release notes | Production live; smoke tests pass |
| 7 | Maintenance | Live site | Monitoring, `CHANGELOG.md`, feedback log | Feedback feeds back into Stage 1 |

---

## Stage details

### Stage 1 — Requirements, Analysis & Architecture
One stage, one gate, worked in three ordered parts. Each part uses the previous part's output.

**1A. Requirements** — *what* the system must do and *how well*
- Vision and purpose; stakeholders and personas; scope (in / out / v2)
- Functional requirements `FR-x.y` with MoSCoW priority and short acceptance criteria
- Non-functional requirements `NFR-x` with measurable targets
- Content requirements; constraints; assumptions and dependencies; risks; glossary; success criteria
- Output: `REQUIREMENTS.md`

**1B. Analysis** — the requirements from the user's and the domain's point of view
- User stories `US-xx` per persona, each linking its FR IDs
- Acceptance criteria in Given / When / Then
- Domain model: entities (Project, Post, Message, Skill…), attributes, relations
- Output: `USER_STORIES.md`, `DOMAIN_MODEL.md`

**1C. Architecture** — *how* the system is structured
- Architecture style, components, tech stack, data storage, hosting
- C4 context + container diagrams
- A strategy for every NFR (e.g. NFR-1 performance → SSG + CDN)
- Every significant choice recorded as an ADR (context, options, decision, consequences)
- Output: `ARCHITECTURE.md`, `adr/ADR-001...`

**Exit criteria:**
- [ ] Every requirement uniquely numbered, testable, prioritized
- [ ] Scope in/out explicit
- [ ] Every FR covered by at least one user story with acceptance criteria
- [ ] Domain entities and attributes listed
- [ ] Every NFR has an architectural strategy
- [ ] Every major decision has an ADR; diagrams match the text
- [ ] Open questions list is empty
- [ ] Reviewed (mentor) and baselined as v1.0

### Stage 2 — Detailed design
- **Goal:** Specify each component precisely enough to implement without guessing.
- **Activities:** API contract (OpenAPI), DB schema + ERD, sitemap + URL structure (incl. `/en`, `/ar`), wireframes per page, design system (colors, type, spacing, RTL rules), folder/module structure.
- **Output:** `openapi.yaml` (`API-xx`), `DB_SCHEMA.md`, `SITEMAP.md`, wireframes, `DESIGN_SYSTEM.md`.
- **Exit criteria:**
  - [ ] Every story maps to screens and/or endpoints
  - [ ] Every entity in the domain model has a table/collection
  - [ ] Error cases defined for every endpoint

### Stage 3 — Planning
- **Goal:** Turn design into ordered, estimable work.
- **Activities:** Epics → stories → tasks (`T-xx`, each ≤ 1 day, linking US IDs); prioritize; dependencies; milestones; Definition of Done.
- **Output:** `BACKLOG.md`, `MILESTONES.md`, `DEFINITION_OF_DONE.md`.
- **Exit criteria:**
  - [ ] Every story has tasks
  - [ ] Tasks ordered by dependency
  - [ ] Milestones have target dates

### Stage 4 — Implementation
- **Goal:** Build task by task.
- **Activities:** One branch + PR per task; conventional commits; code review (self or mentor); unit tests written with the code.
- **Output:** Code, merged PRs, `CONTRIBUTING.md` (conventions).
- **Exit criteria (per task = Definition of Done):**
  - [ ] Implements its task, references its IDs in the PR
  - [ ] Lint, type-check, tests pass in CI
  - [ ] Reviewed and merged

### Stage 5 — Testing / QA
- **Goal:** Prove the system meets requirements.
- **Activities:** Test plan; unit, integration (API + DB), end-to-end (key user flows in both languages); NFR checks (Lighthouse, accessibility audit, security headers, load test on API); fill traceability matrix.
- **Output:** `TEST_PLAN.md` (`TC-xx`), reports, `TRACEABILITY.md`.
- **Exit criteria:**
  - [ ] Every acceptance criterion has a passing test
  - [ ] All NFR targets met or deviations documented
  - [ ] Traceability matrix complete FR → TC

### Stage 6 — Deployment
- **Goal:** Ship safely and repeatably.
- **Activities:** CI/CD pipeline, environments (preview, production), secrets management, domain + HTTPS, smoke tests, rollback procedure.
- **Output:** Pipeline config, `RUNBOOK.md`, release notes `v1.0.0`.
- **Exit criteria:**
  - [ ] Production deploy is automated from `main`
  - [ ] Smoke tests pass on production
  - [ ] Rollback tested once

### Stage 7 — Maintenance
- **Goal:** Keep it healthy and evolve it.
- **Activities:** Uptime + error monitoring, analytics review, dependency updates, collect v2 ideas.
- **Output:** `CHANGELOG.md`, issues/feedback log.
- **Loop:** New features re-enter at Stage 1 as new FR IDs.

---

## Repository layout for docs

```
/docs
  01-foundation/REQUIREMENTS.md
  01-foundation/USER_STORIES.md
  01-foundation/DOMAIN_MODEL.md
  01-foundation/ARCHITECTURE.md
  01-foundation/adr/
  02-design/openapi.yaml
  02-design/DB_SCHEMA.md
  02-design/SITEMAP.md
  02-design/DESIGN_SYSTEM.md
  03-planning/BACKLOG.md
  03-planning/MILESTONES.md
  03-planning/DEFINITION_OF_DONE.md
  05-testing/TEST_PLAN.md
  05-testing/TRACEABILITY.md
  CHANGELOG-DOCS.md
PROCESS.md
```

## Using this with AI agents

For each stage, give the agent:
1. This file's section for that stage
2. The input artifacts listed
3. The instruction: *"Produce the output artifact. Every item must reference its parent IDs. Stop and list open questions instead of guessing."*

You review the output against the exit criteria, then baseline it before the next stage starts.
