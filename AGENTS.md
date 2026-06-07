# ADRAGON Portfolio Agent Rules

Default language for user-facing replies: Chinese.
Keep commands, code identifiers, paths, framework names, and errors in English.

## Project Identity

This repository is the bilingual personal technology brand site for ADRAGON.
It is not a generic portfolio and not a generic SaaS landing page.

The site should communicate:

- Evidence-first AI systems builder.
- AI agents need evidence, receipts, review gates, and claim boundaries.
- Current proof systems: ShadowBuyer, Agent Flight Recorder, Solo AI Company OS.
- Chinese and English are both first-class, but they should correspond rather than mirror each other word for word.

## Tech Stack

- Next.js 16 App Router.
- React 19.
- TypeScript.
- Tailwind CSS.
- Dictionary-driven bilingual content under `lib/dictionaries`.

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

The `npm run lint` script currently calls `next lint`, which may not be supported by the installed Next.js version. Prefer `npm run build` as the main verification gate unless the lint script is updated.

## Source Of Truth Order

1. Latest explicit user instruction.
2. `PRODUCT.md`
3. `DESIGN.md`
4. `docs/PROJECT_MAP.md`
5. `docs/dehydration-protocol-sacp-audit-evolution.md`
6. Existing source code patterns.
7. Historical screenshots, logs, and previews.

## Editing Boundaries

- Do not expose private local paths, private repo URLs, secrets, or tokens in public site copy.
- Do not remove SACP, receipts, evidence, audit, ShadowBuyer, Agent Flight Recorder, or Solo AI Company OS.
- Do not make owner-only planning loops public.
- Do not turn the page into a generic freelancer profile, SaaS template, neon AI page, or card-heavy marketing page.
- Do not rewrite the app architecture unless the task explicitly asks for architecture work.
- Keep edits scoped to the task and preserve unrelated user changes.

## Bilingual Rules

- Chinese page: emphasize person, growth, compounding, projects, cooperation, and operational judgment.
- English page: emphasize thesis, proof, builds, receipts, pilots, and inspection.
- Keep project names stable across both languages.
- Avoid literal translation when a native expression is clearer.

## Verification

Before saying work is complete, provide fresh evidence:

- `git status --short`
- `npm run build`
- If frontend layout changes were made, inspect `/zh` and `/en` locally.
- If CodeGraph was used, include the query or status command that informed the edit.

## Known Build Note

On 2026-06-07, `npm run build` compiled successfully but failed during TypeScript because generated `.next/dev/types/validator.ts` was malformed and referenced missing dev route types. This points to a generated Next.js dev-type cache issue, not to the project-map documentation. If this recurs, investigate generated `.next/dev` state before changing source code.

## CodeGraph Local Intelligence

CodeGraph is the local-first code intelligence layer for this repo. It indexes code into `.codegraph/codegraph.db`; that directory is local-only and must not be committed.

Use CodeGraph before broad file reading when the task asks about architecture, entrypoints, call chains, impact radius, affected files, or where a symbol lives.

Preferred preflight commands:

- `codegraph status`
- `codegraph files`
- `codegraph query <symbol-or-topic>`
- `codegraph callers <symbol>`
- `codegraph callees <symbol>`
- `codegraph impact <symbol>`
- `codegraph affected <changed-file>`

After source changes, run `codegraph sync` or confirm the MCP watcher has synced before relying on impact analysis. Save meaningful CodeGraph-assisted work in `docs/receipts/` with the query used, changed files, verification, and remaining risk.