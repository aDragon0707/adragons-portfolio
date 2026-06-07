# Receipt — Homepage + Projects UI Polish (Phase 2A)

Date: 2026-06-07
Branch: `claude-ui-polish-phase-2a`
Task packet: `docs/tasks/claude-home-projects-ui-polish-2026-06-07.md`

## Scope

Phase 2A: visual system + projects-page role grouping. No copy rewrite, no new
routes, no new dependencies, no future writing-lanes implementation.

## CodeGraph

- `codegraph_status` before edit: 27 files, 202 nodes, 368 edges.
- `codegraph_explore HomeView home-sections ProjectsPage WritingSection` confirmed:
  - `HomeView` has a single caller (`app/[lang]/page.tsx`).
  - `WritingSection`, `Section`, `MetadataPanel`, `ProjectCard` are local to
    `app/[lang]/home-sections.tsx`.
  - `ProjectsPage` is a standalone route component.
  - No test files cover any of these — verification is build + dev-server only.
- Post-edit `codegraph_status`: unchanged (27 / 202 / 368). Blast radius unchanged.

## Changed files

- `app/globals.css`
  - Added `--radius-control: 8px`, `--radius-card: 14px` tokens.
  - Split global word-break: kept aggressive break on body text (`p, a, span, li, dd, dt`),
    relaxed it on `h1/h2/h3`. Added `.cjk-safe h*` with `word-break: keep-all`
    so Chinese headings do not shatter mid-cluster.
  - `.button-link`: 999px pill → 8px control, weight 700 → 650, ghost border by default.
  - `.primary-action`: retired purple fill + glow shadow → solid `--ink` on
    `--paper`, hover transitions to `--blue`. No `transform: translateY` lift.
  - Split the shared card mixin: cards remain only on `.qr-card`, `.offer-card`,
    `.status-panel`, `.builder-note`, `.proof-shelf article`. `.project-proof`,
    `.note-card`, `.featured-note`, `.archive-row`, `.project-ledger-card`,
    `.signal-step` are now hairline-bordered rows (no background, no box-shadow,
    no hover lift).
  - Hero title: 3.4–6.4rem → 2.4–4.4rem (latin), 3.45–5.9rem → 2.2–3.9rem (CJK).
    Removed CJK `letter-spacing: -0.035em` per DESIGN.md.
  - Archive header (projects page h1): 3.2–6.2rem → 2.2–3.6rem.
  - Section title: 1.8–2.8rem → 1.45–2.05rem; added `.cjk-safe` override with
    `letter-spacing: 0` and `line-height: 1.32`.
  - Mobile hero clamp: removed `max-width: 10ch` that crushed CJK title into
    3-character fragments at 390px; new clamp `2.1–3.2rem` with `line-height: 1.25`.
  - Removed hardcoded English `content: "Proof objects"` from
    `.status-panel::before` (bilingual leak).
  - Added `.role-group`, `.role-group-head`, `.role-group-label`,
    `.role-group-caption`, `.role-group-list` for the projects page.

- `app/[lang]/projects/page.tsx`
  - Now iterates `dict.projects.groups` (cashflow / agent_trust / os / learning)
    and filters items by `role`. Each group is its own `<section id={key}>` with
    a serif group label and one-line caption.
  - Spec labels now read from `dict.projects.spec_labels` (`Problem | Thesis |
    System | Next`) instead of hardcoded English `Problem | Protocol | Trace |
    Evidence | Next`.
  - Dropped the duplicate `<dt>Evidence</dt><dd>{project.description}</dd>` row
    (description already appears in the left column).
  - Numbering switched from per-loop `index + 1` to a running counter so
    `01..06` flows across all groups.

- `lib/dictionaries/en.ts`
  - Added `home.projects.groups` (4 entries) and `home.projects.spec_labels`.
  - Added `role: "cashflow" | "agent_trust" | "os" | "learning"` to each item.
  - No existing copy reworded.

- `lib/dictionaries/zh.ts`
  - Mirrored schema: `groups` (现金流证据 / Agent 信任证据 / 操作系统证据 / 学习系统),
    `spec_labels` (问题 / 主张 / 系统 / 下一步), `role` per item.
  - No existing copy reworded.

## Verification

- `npm run build`:
  - Source compiled: `✓ Compiled successfully in 7.2s`.
  - TypeScript step failed in `.next/dev/types/validator.ts:17` with
    `Cannot find name 'AppRoutes'`. This is the documented generated-types
    environment noise (see `CLAUDE.md` / `AGENTS.md`). Generated file was not
    patched.
- `npx tsc --noEmit --skipLibCheck`: no source TypeScript errors after
  filtering generated-file diagnostics.
- Dev server (`npm run dev`) booted clean on `:3000` (`✓ Ready in 527ms`,
  no compile errors in the request log).
- HTTP smoke test on all four routes:
  - `/zh` → 200, 38199 B
  - `/en` → 200, 38467 B
  - `/zh/projects` → 200, 45406 B
  - `/en/projects` → 200, 46061 B
- HTML grep confirms:
  - `role-group` and `project-ledger-card` rendered on both `/zh/projects`
    and `/en/projects`.
  - Localized spec labels on `/zh/projects`: `问题`, `主张`, `系统`, `下一步`
    each render 12× (6 projects × 2 occurrences) — no hardcoded `Problem |
    Protocol | Trace | Next` strings.
  - Group labels: `现金流证据`, `Agent 信任证据`, `操作系统证据`, `学习系统`
    each appear on `/zh/projects`; English equivalents on `/en/projects`.
  - Residual `Evidence` matches on `/zh/projects` are tag values
    (`Evidence cards`, `Evidence ledger`) — framework/brand terms intentionally
    kept in English per `AGENTS.md` bilingual rules.

- Visual inspection at desktop / 390px **was not performed in this CLI session**
  (no browser tool available). HTTP smoke tests confirm clean render and no
  source-level errors, but the actual visual rhythm/overflow check on real
  viewports should be eyeballed before merge.

## Intentionally not changed

- Homepage section structure (`home-sections.tsx`). Visual change applied via
  CSS only; no role grouping on the home preview yet — that lands in Phase 2B
  along with the writing-lanes feature.
- Hero, status, and section copy in `zh.ts` / `en.ts`. Only schema additions.
- Owner / admin / annotation widgets and the floating `.annotate-entry`
  button — `--purple` retained there because it is owner-only chrome.
- `notes`, `proof`, `offers`, `builder`, `flow` dictionary sections.
- `next-env.d.ts` (regenerated by build; not staged).

## Remaining Phase 2B suggestions

1. Reshape the homepage `projects` section to mirror the role groups —
   currently it still shows the first three items flat. Could either show
   "cash-flow + agent-trust" as a two-row featured pair, or render a compact
   ledger of all four group headings with one entry each.
2. Implement the writing-lanes affordance: add `writing_lanes` and
   `thinking_modules` arrays to the dict and render them as a muted micro-link
   strip under each `WritingSection`. Currently the slots exist conceptually
   but no UI surface.
3. Retire `MetadataPanel`'s key/value tile in favor of a typographic strip
   (`Role · Focus · Current work · Collaboration`) — quieter, less SaaS-tile.
4. Replace the `-&gt;` literal arrows with a real `→` glyph (zero risk, but
   touches multiple components — better as its own pass).
5. Add `next.config` / `tsconfig` adjustment if the
   `.next/dev/types/validator.ts` issue recurs on CI. Out of UI scope but
   worth filing as a separate task.
6. Investigate the `.brand-hero-grid > .builder-note` baseline alignment
   `margin-top: clamp(3.6rem, 5.6vw, 5.2rem)` — fragile with the smaller
   hero title and may now push the side panel below the fold awkwardly.
