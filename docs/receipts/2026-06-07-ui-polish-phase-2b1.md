# Receipt — Homepage Proof Preview Refinement (Phase 2B-1)

Date: 2026-06-07
Branch: `claude-ui-polish-phase-2a` (continuation)
Predecessor: commit `3409504` (Phase 2A)

## Scope

Phase 2B-1: homepage structure refinement only.
- Replace flat top-3 projects preview with role-aligned proof rows.
- Reduce `MetadataPanel` from card tile to quiet typographic strip.
- Replace `-&gt;` literals with real `→` glyphs in homepage-touched areas only.

Out of scope (deferred to 2B-2+): writing_lanes, thinking_modules, full arrow
sweep across the repo, `/projects` page changes.

## CodeGraph

- Pre-edit `codegraph_status`: 27 files / 202 nodes / 368 edges (unchanged
  since Phase 2A).
- `codegraph_impact HomeView`: still 4 symbols (`HomeView`, `HomePage`, two
  file nodes). Blast radius unchanged.
- HomeView still has a single caller (`app/[lang]/page.tsx`); no other route
  consumes `home-sections.tsx` exports.

## Pre-edit sanity check

Dev server smoke against Phase 2A: all four routes `200` with identical sizes
to the Phase 2A baseline. No layout regressions observed at HTTP level. No
errors in dev request log. Proceeded to edit.

## Changed files

- `app/[lang]/home-sections.tsx`
  - **Projects preview**: replaced the flat
    `dict.projects.items.slice(0, 3).map(ProjectCard)` block with a role-driven
    `.proof-preview-list` containing four rows:
    1. `cashflow` (ShadowBuyer) — priority row
    2. `agent_trust` (Agent Flight Recorder)
    3. `os` (Solo AI Company OS)
    4. `learning` — compact summary row listing the three learning items as
       `title · category` lines under the group caption (does **not** repeat
       the full ProjectCard for each).
    Each row carries a small uppercase kicker (`.proof-preview-kicker`) with
    the localized group label, sitting above the existing `ProjectCard`.
  - **MetadataPanel**: replaced `<aside class="builder-note">` containing a
    serif `h2` and `.status-stack` divs with a quieter
    `<aside class="builder-strip">` — `brand-label` header + `<dl>` of
    `status.items`. No data removed (still renders 角色 / 方向 / 当前项目 /
    协作 etc.).
  - **Arrows (homepage scope only)**: replaced three `-&gt;` literals with
    `<span aria-hidden="true">→</span>`:
    - "View all projects" link under the projects preview.
    - `WritingSection` view link (used by both Tech blog and Thinking blocks).
    - `ProjectCard` primary action link.

- `app/globals.css`
  - Added `.proof-preview-list`, `.proof-preview-row`, `.proof-preview-kicker`,
    `.cjk-safe .proof-preview-kicker` (looser tracking for Chinese).
  - Added `.learning-summary` (hairline top), `.learning-summary-caption`,
    `.learning-summary-list` (borderless `ul`), per-item layout
    `(title | category)` with CJK letter-spacing override.
  - Added `.builder-strip`, `.builder-strip-list`, `.builder-strip-list dt`
    (uppercase label, CJK override drops uppercase since Chinese has no case),
    `.builder-strip-list dd`. Baseline alignment via
    `margin-top: clamp(2rem, 3.6vw, 3.2rem)` so it sits with the hero block
    without the old `.builder-note` rule firing.

- `lib/dictionaries/en.ts`, `lib/dictionaries/zh.ts`
  - **Fixed a latent Phase 2A type bug**: switched `groups: [...] as const`
    on the array to per-property `key: "..." as const` on each entry. The
    array-level `as const` had narrowed `label` and `caption` to specific
    English literal types, so the same-shaped `zh.ts` failed assignability
    against `Dictionary = typeof en` (8 errors, e.g.
    `Type '"现金流证据"' is not assignable to type '"Cash-flow proof"'`).
    The per-property version keeps `key` narrowed (needed for the discriminated
    union used by the projects-page filter) while leaving `label`/`caption`
    as `string`.
  - **No copy added or reworded** otherwise.

- `docs/receipts/2026-06-07-ui-polish-phase-2b1.md` (this file)

## Why the latent type bug was missed in Phase 2A

The Phase 2A `npx tsc --noEmit` run was filtered through
`grep -vE "^\.next/dev/types|^node_modules"` and reported empty. In hindsight
the tsc invocation likely returned before the source pass completed (or the
filtered output was truncated). When the same command ran today it surfaced
all 8 errors. They are now fixed; treat the Phase 2A receipt's "no source TS
errors" line as inaccurate.

## Verification

- `npx tsc --noEmit --skipLibCheck --project tsconfig.json` (filtered):
  no source errors after the `as const` fix.
- `npm run build`: failed during font fetch
  (`next/font: Failed to fetch Noto Serif SC / Source Serif 4 from Google
  Fonts`). This is **network environment noise** (Google Fonts unreachable),
  not a source issue. Dev server runs cleanly because Next loads the font
  module lazily on first request and cached fonts persist locally. No
  generated files patched.
- Dev server: clean boot, no compile errors during the smoke run.
- HTTP smoke (`http://localhost:3000`):
  - `/zh` → 200, 41 379 B (was 38 199 B in Phase 2A; +3 180 B = role rows + builder-strip dl)
  - `/en` → 200, 41 794 B (was 38 467 B)
  - `/zh/projects` → 200, 45 406 B (unchanged — not touched in 2B-1)
  - `/en/projects` → 200, 46 061 B (unchanged)
- HTML grep on `/zh`:
  - `proof-preview-list ×2`, `proof-preview-row ×8`, `proof-preview-kicker ×8`,
    `learning-summary ×6`, `builder-strip ×4`, `→ ×12`.
  - **Zero `-&gt;` matches** on `/zh` HTML.
  - **Zero `builder-note`** matches (replaced).
  - **Zero plain `project-ledger"` class** (the old flat list class is gone).
  - Localized group labels: 现金流证据, Agent 信任证据, 操作系统证据, 学习系统
    all render twice (kicker on homepage + group label structure rendered by
    classNames).
  - Builder-strip dt fields on `/zh`: 角色 ×3, 当前项目 ×3 — matches dict
    `status.items` entries.
- HTML grep on `/en`: mirrored — `Cash-flow proof`, `Agent-trust proof`,
  `Operating-system proof`, `Learning systems`, `Role`, `Current work`,
  `Metadata` all present; `builder-strip ×4`, `→ ×12`, no `-&gt;`.
- **Visual viewport screenshots at 1440px / 390px not performed** (no browser
  tool in this CLI session). Recommend a manual eyeball before merge to
  confirm:
  - The four role rows breathe correctly on desktop.
  - The learning-summary list does not overflow at 390px (titles can be
    long, e.g. "Reading Reflection OS").
  - `builder-strip` sits at the right vertical level vs. the hero copy.

## What changed (user-visible)

- Homepage projects section now reads as a four-row **proof index** with
  role kickers (Cash-flow / Agent-trust / Operating-system / Learning),
  not three flat cards. ShadowBuyer is the priority row.
- Learning systems are summarized in one row (title + category list, plus
  the group caption) rather than each consuming a full card slot.
- The hero right column is now a quiet typographic strip — `MetaData` label
  + dt/dd lines — rather than a boxed card with a serif `h2`. Same content.
- All visible homepage arrows are real `→` glyphs (semantic ar `→` wrapped
  in `aria-hidden="true"` spans so screen readers don't announce them).

## Intentionally not changed

- `/zh/projects` and `/en/projects` layout — not in 2B-1 scope.
- `WritingSection` body structure (note-card list) — only the arrow inside it.
- Hero copy, status copy, all dictionary text outside the type fix.
- `writing_lanes` / `thinking_modules` — explicitly deferred.
- Nav, admin, owner-mode, posts parsing, annotation widgets — untouched.
- No new routes / query params / dependencies.
- `next-env.d.ts` (regenerated by build, not staged).

## Remaining Phase 2B-2 recommendation

1. **Writing lanes scaffold**: add `writing_lanes` (skills · prompts · agents
   · MCP · receipts) and `thinking_modules` (growth path · do/do-not ·
   compound loop · current edge) string arrays to both dicts, render them
   as a single muted micro-link strip under each `WritingSection` title.
   No new routes — links can target `#tech-blog` / `#thinking` for now,
   or be `tabindex="-1"` placeholders until lane filtering ships.
2. **Tighten `.brand-hero-grid` baseline** with the new `.builder-strip`:
   current `margin-top: clamp(2rem, 3.6vw, 3.2rem)` is a rough estimate;
   may want to drop it on viewports under ~900px where the right column
   stacks below the hero copy.
3. **Verify long learning titles** at 390px — "Reading Reflection OS"
   plus a long category ("学习操作系统") in the right column may wrap
   awkwardly; consider stacking title/category vertically on narrow widths.
4. **Hold for a follow-up**: a single arrow-sweep pass for `/zh/projects`,
   `/en/projects`, and `/blog`/`/thinking` archive rows so the whole site
   uses `→` consistently.
5. **Investigate the Google Fonts build failure** (network noise) — for CI,
   either pre-bundle the Noto Serif SC / Source Serif 4 fonts as local
   `next/font/local` or run the build behind a proxy. Out of UI scope.
6. **Re-run `codegraph_impact` against `MetadataPanel`** after this lands;
   one upstream caller (`HomeView`) is expected, but the `builder-note`
   CSS class is now unused on the home page (still referenced by global
   `.builder-note` rules in `globals.css` for safety; consider cleanup).
