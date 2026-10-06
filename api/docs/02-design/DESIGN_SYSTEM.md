# Design System

> Stage 2 · Detailed design · v0.1 · 2026-10-02
> Source: the approved UI design canvas (black + emerald, wave hero). Feeds: Tailwind config, CSS variables, React components.
> Rule for implementation: components use **tokens only**. A raw hex value in a component is a review failure.

The look is black with a deep emerald accent, a serif display face over a clean sans body, and one signature effect: a night-sky hero with rolling green waves. Dark is the default theme; light is a white-and-emerald mirror of it.

---

## 1. Color tokens

All pairs below were measured against WCAG 2.1; every text pair passes **AA (≥ 4.5:1)** in both themes.

### 1.1 Core

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--bg` | `#070908` | `#F6F8F6` | Page background |
| `--surface` | `#0E1311` | `#FFFFFF` | Cards, panels, inputs |
| `--chip` | `#15201A` | `#E9F2EC` | Tags, highlight tiles |
| `--nav-active` | `#1A2A21` | `#DCEBE1` | Current nav item |
| `--ph` | `#111A15` | `#EEF3EF` | Image placeholders |
| `--text` | `#EEF5F0` | `#0A0F0C` | Primary text (18.0:1) |
| `--text-2` | `#D6E2DA` | `#1C2621` | Strong body text |
| `--muted` | `#A6B5AC` | `#45534B` | Supporting text (9.3 / 7.6:1) |
| `--subtle` | `#8A9A90` | `#59675F` | Metadata, captions (6.8 / 5.6:1) |
| `--line` | `#18221D` | `#DDE6E0` | Dividers |
| `--card-line` | `#1C2A23` | `#E1E9E4` | Card borders |
| `--line-strong` | `#2A3D32` | `#C3D1C8` | Secondary button borders |
| `--input-line` | `#3A5244` | `#AFC0B5` | Form field borders |
| `--error` | `#F97066` | `#B42318` | Error text and borders (6.7 / 6.6:1) |

### 1.2 Accent (emerald)

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#18A558` | `#0E7A43` | Links, primary buttons, eyebrows (6.2 / 5.1:1 on bg) |
| `--accent-hover` | `#2BC06F` | `#0A5F34` | Hover state |
| `--on-accent` | `#04150B` | `#FFFFFF` | Text on accent fill (5.9 / 5.4:1) |
| `--accent-soft` | `#0C2618` | `#DFF5E8` | Tinted chips and tiles |
| `--accent-soft-line` | `#164229` | `#C2EBD3` | Border on tinted tiles |
| `--accent-soft-text` | `#6FD39A` | `#0A5F34` | Text on tinted tiles (8.8 / 6.8:1) |
| `--highlight` | `#18A558` | `#15803D` | Decorative accent: underline, badge, numerals, hover edges |
| `--highlight-text` | `#2BB866` | `#0E7A43` | Accent-colored small text (7.8 / 5.1:1) |
| `--btn-solid` | `#18A558` | `#0A0F0C` | Header Contact button |
| `--on-btn-solid` | `#04150B` | `#F6F8F6` | Text on it |

### 1.3 Effect colors (hero only)

| Token | Dark | Light |
|---|---|---|
| `--sky-1 / -2 / -3` | `#040605 / #06100A / #0A2416` | `#F6F8F6 / #E6F4EB / #CDEBD8` |
| `--wave-back` | `#0B2E1C` | `#9FE0B8` |
| `--wave-mid` | `#14532D` | `#1E7A47` |
| `--orb-1 / -2` | `#7FD9A5 / #15803D` | `#BFEFD2 / #22A05A` |
| `--name-a / -b / -c` | `#EEF5F0 / #5FC98C / #18A558` | `#0A0F0C / #0E7A43 / #15803D` |

**Theme switching:** tokens are set on the root element; `[data-theme="dark"]` overrides them. First visit follows `prefers-color-scheme`; the toggle stores the choice in `localStorage` and an inline script applies it before first paint, so there is no flash.

## 2. Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display (h1–h3, numerals, name) | **Fraunces** | 500, 600, italic 500 | Italic used for one emphasized word per heading |
| Body and UI | **Manrope** | 400, 500, 600, 700 | All interface text |
| Code, API card | **IBM Plex Mono** | 400, 500 | Code blocks, endpoint labels |
| Arabic | **IBM Plex Sans Arabic** | 400, 500, 600, 700 | All `/ar` text; Latin terms inside Arabic stay in Manrope |

Self-host all fonts as WOFF2 subsets (Latin; Arabic subset for Plex Sans Arabic) with `font-display: swap` (NFR-1).

### Type scale (fluid)

| Token | Size | Line height | Use |
|---|---|---|---|
| `display` | `clamp(52px, 7.4vw, 104px)` | 0.98 (1.15 in Arabic) | Name in hero |
| `h1` | `clamp(36px, 4.4vw, 56px)` | 1.08 | Page titles |
| `h2` | `clamp(32px, 3.6vw, 48px)` | 1.1 | Section titles |
| `h3` | `22–24px` | 1.3 | Card titles |
| `lead` | `clamp(18px, 1.6vw, 21px)` | 1.55 | Intro paragraphs |
| `body` | `16–17.5px` | 1.65–1.75 | Paragraphs |
| `small` | `13.5–15px` | 1.5 | Meta, chips, captions |
| `eyebrow` | `14px`, 700, `0.06em`, uppercase | 1.4 | Section labels (Latin only; Arabic uses 15px, no caps) |

Minimum text size anywhere: 12px.

## 3. Space, size and shape

| Token | Value |
|---|---|
| Spacing scale | 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 72, 88, 104, 120 px |
| Container | `max-width: 1200px`, side padding `clamp(20px, 4vw, 40px)` |
| Section padding | 72–120px vertical |
| `--radius-pill` | `999px` (buttons, chips, nav items) |
| `--radius-card` | `24px` |
| `--radius-media` | `16px` |
| `--radius-input` | `10px` |
| Photo frame | Arch: `999px 999px 28px 28px`, 6px surface border |
| Touch target | ≥ 44 × 44 px for every interactive element |
| Breakpoints | Fluid by default; layout changes at 768px (nav collapses) and 1024px |

## 4. Motion

| Effect | Spec | Where |
|---|---|---|
| Sky drift | Background position, 18s, ease-in-out, alternate | Hero |
| Waves | 3 layers, `translateX(-50%)` loop at 26s / 17s / 11s, linear | Hero bottom, CTA top |
| Orb pulse | Scale 1 → 1.06, 7s, ease-in-out | Behind photo, CTA corner |
| Name shimmer | Gradient sweep, 9s, alternate | Hero name |
| Underline draw | Width 0 → 100%, 1.4s, delay 0.4s, once | "reliable systems" |
| Badge rotation | 360°, 22s, linear | Hero badge |
| Card lift | `translateY(-6px)` + accent border + shadow, 0.3s | Hover on cards |
| Theme switch | Colors transition 0.2s | Global |

**Rules:** animate only `transform`, `opacity` and `background-position` (no layout properties). Under `prefers-reduced-motion: reduce`, every looping effect stops and hover lift is removed. Total looping animations on one screen: at most 5.

## 5. Components

| Component | Variants and states | Key specs |
|---|---|---|
| **Button** | `primary` (accent fill), `secondary` (surface + border), `text` (underlined), `solid` (header Contact) | Pill, min-height 48–52px, 700 weight; hover → `--accent-hover`; focus ring 2px `--accent`, offset 3px; one primary per view |
| **Chip / Tag** | `neutral` (`--chip`), `accent` (`--accent-soft`), `filter` (toggle, `aria-pressed`) | Pill, 12.5px, 600 weight; filter chips ≥ 44px tall |
| **Project card** | default, hover (lift), placeholder image | 24px radius, 14px padding, image 16:10 |
| **Skill card** | default, `primary` (2px accent border + "Primary" label) | 24px radius |
| **Highlight tile** | — | `--chip` fill, 20px radius, Fraunces number in `--accent` |
| **Header** | transparent (Home hero), solid (other pages) | Logo, links, language switch, theme toggle, Contact |
| **Theme toggle** | light (moon icon), dark (sun icon) | 44px circle; `aria-label` says the action ("Switch to dark mode") |
| **Language switch** | — | Shows the other language in its own script (`العربية` / `English`) with `lang` set |
| **Form field** | default, focus, error, disabled | Label above; 48px input; error = 2px `--error` border + icon + message linked by `aria-describedby` |
| **Radio pill group** | unselected, selected | Real `<input type="radio">` inside `<label>`; selected = 2px accent border + `--accent-soft` fill |
| **Status message** | success | `role="status"`, check icon, reference ID |
| **Timeline** | — | 2px line on the inline-start side, dot per entry, newest first |
| **API card** | — | Mono, always LTR, dark in both themes |
| **Wave divider** | top, bottom | SVG, decorative, `aria-hidden` |

## 6. RTL rules (Arabic)

1. Use logical properties only: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `border-inline-start`. Never `left` / `right` for layout.
2. Directional icons (arrows) flip with `transform: scaleX(-1)` in RTL; non-directional icons (download, check, sun) do not.
3. Code, API cards, URLs and numbers stay LTR: wrap in `dir="ltr"`.
4. Latin product names inside Arabic text (Node.js, NestJS) are wrapped in `<span dir="ltr">`.
5. Arabic text: no uppercase or letter-spacing; line height +0.15 to +0.2 over Latin.
6. Waves and other decorative motion keep their direction (they are not reading-order).

## 7. Accessibility rules (NFR-3)

- Contrast: all text pairs ≥ 4.5:1 (verified, section 1); large display text ≥ 3:1.
- Focus: visible 2px ring on every interactive element; never removed.
- Every control is a real `<a href>`, `<button>` or `<input>` with a label; icon-only buttons have `aria-label`.
- Decorative SVGs (waves, orb, badge ring) are `aria-hidden="true"`; the photo has a descriptive label.
- Gradient text (hero name) also renders as plain `--text` color when `forced-colors` is active.
- Page language and direction are set on `<html>`; language links carry `lang`.

## 8. Implementation mapping

| Here | In code |
|---|---|
| Color tokens | CSS variables in `globals.css`, exposed to Tailwind as `colors.{token}` |
| Type scale | Tailwind `fontSize` extension + `next/font` for the four families |
| Radii, spacing | Tailwind theme extension |
| Motion | Keyframes in `globals.css`, `motion-safe:` variants in Tailwind |
| Components | `apps/web/src/components/ui/*`, one file per component, stories in Storybook (optional) |
