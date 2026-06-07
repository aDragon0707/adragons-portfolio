# Claude Code Working Guide

You are improving ADRAGON's bilingual personal technology brand site.
Read this file before editing.

## Read First

1. `AGENTS.md`
2. `PRODUCT.md`
3. `DESIGN.md`
4. `docs/PROJECT_MAP.md`
5. `docs/dehydration-protocol-sacp-audit-evolution.md`

Then load only the source files needed for the current task.

## What The Site Must Preserve

- Core thesis: AI agents need evidence, not just answers.
- Public story: web evidence, agent receipts, solo-company operating systems.
- Main projects: ShadowBuyer, Agent Flight Recorder, Solo AI Company OS.
- Bilingual structure: `/zh` and `/en` should feel intentionally written for different readers.
- Owner-only features remain private.

## How To Work

1. Restate the task in one compact paragraph.
2. Use CodeGraph or file search to identify the impacted files.
3. Read the impacted files before editing.
4. Make a narrow change.
5. Run `npm run build`.
6. Report changed files, verification result, and remaining risk.

## CodeGraph Usage

If CodeGraph is initialized, prefer it for structural questions:

- `codegraph status`
- `codegraph files`
- `codegraph query HomeView`
- `codegraph query getDictionary`
- `codegraph impact HomeView`
- `codegraph affected <changed-file>`

Use CodeGraph to reduce blind file loading. Use source files to verify exact behavior before editing.

## Known Build Note

If `npm run build` fails inside `.next/dev/types/validator.ts`, treat it as a generated Next.js dev-type issue first. Confirm whether source files changed before applying fixes. Do not patch generated `.next` files as a real solution.

## Do Not

- Do not redesign from scratch.
- Do not add decorative gradients, glassmorphism, random UI cards, or generic AI visuals.
- Do not add new dependencies unless the user explicitly asks.
- Do not publish or deploy without explicit approval.
- Do not commit `.env.local`, `.next`, `node_modules`, `.codegraph`, logs, or screenshots unless explicitly requested.

## CodeGraph Local Intelligence

Use CodeGraph as the first structural navigation layer for architecture, entrypoint, call-chain, impact, and affected-file questions.

Recommended flow:

1. Restate the task in one compact paragraph.
2. Ask CodeGraph the structural question first.
3. Read only the files CodeGraph or the task makes relevant.
4. Edit narrowly.
5. Run the repo-specific verification command.
6. Run `codegraph sync` after source changes, unless MCP watcher already synced.
7. Write a short receipt for meaningful changes.

Do not patch generated `.codegraph/` files. Do not commit `.codegraph/`.