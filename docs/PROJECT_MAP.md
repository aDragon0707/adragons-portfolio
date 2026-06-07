# ADRAGON Portfolio Project Map

This map exists so Codex, Claude Code, and CodeGraph can work from the same project path instead of rediscovering the repository every session.

## Product Path

The site is moving from "personal portfolio" to "high-trust personal IP product."

Current strategic path:

1. Make the builder understandable.
2. Make the projects inspectable.
3. Make the thesis memorable.
4. Make the proof artifacts easy to open.
5. Make pilot offers simple enough for first buyers.
6. Use writing as the thought spine behind the systems.

## Core Thesis

AI agents need evidence, not just answers.

The website should show that through:

- Receipts.
- Evidence cards.
- Audit reports.
- Review gates.
- Claim boundaries.
- Public artifacts.

## Main Routes

- `app/[lang]/page.tsx`: homepage data loading and route entry.
- `app/[lang]/home-sections.tsx`: homepage presentation sections.
- `app/[lang]/projects/page.tsx`: project ledger page.
- `app/[lang]/blog/page.tsx`: technical writing index.
- `app/[lang]/thinking/page.tsx`: thought spine / personal thinking index.
- `app/[lang]/devlog/[slug]/page.tsx`: individual writing page.
- `app/[lang]/admin/page.tsx`: owner-only writing entry.

## Main Data Surfaces

- `lib/dictionaries/zh.ts`: Chinese site copy.
- `lib/dictionaries/en.ts`: English site copy and shared dictionary type.
- `lib/dictionaries/index.ts`: locale selection.
- `lib/posts.ts`: post parsing and sorting.
- `posts/`: public writing content.
- `public/assets/`: public PDFs, images, and QR assets.

## Styling Surface

- `app/globals.css`: global visual language and section/component styles.
- `tailwind.config.ts`: Tailwind setup and theme extension.
- `components/Nav.tsx`: site navigation.
- `components/AnnotationWidget.tsx`: annotation UI.

## Private / Owner Surface

- `lib/owner-mode.ts`: owner access checks.
- `app/api/owner-mode/route.ts`: owner mode route.
- `app/api/owner-mode/clear/route.ts`: owner mode clearing.
- `app/api/save-post/route.ts`: owner-side post saving.
- `app/[lang]/admin/WritingDesk.tsx`: writing desk UI.

Owner-only planning, private loops, local paths, and sensitive strategy should not be published into public routes.

## Public Project Narrative

### ShadowBuyer Web Data Audit Agent

Purpose: web data audit pilot for public-page evidence, price/inventory/policy diffs, evidence cards, and one-page audit reports.

Public role: closest to cash-flow offer.

### Agent Flight Recorder

Purpose: agent receipt protocol for claims, evidence status, missing proof, review gates, and repair recommendations.

Public role: strongest AI agent trust thesis.

### Solo AI Company OS

Purpose: operating system for coordinating one builder plus many AI workers with memory, worklogs, handoffs, decisions, and receipts.

Public role: shows long-term compounding and operating taste.

## Agent Workflow

Use this route for future AI work:

1. Start with a task packet in `docs/tasks/`.
2. Use CodeGraph to locate impacted files.
3. Read the task packet and exact source files.
4. Edit narrowly.
5. Build and inspect.
6. Save a short receipt in `docs/receipts/` when the change is meaningful.

## CodeGraph Layer

CodeGraph should answer structural questions:

- What files make up the homepage?
- Where is a project title defined?
- Which routes depend on dictionary content?
- What code is impacted if `HomeView` changes?
- What tests or pages are likely affected by a file change?

CodeGraph is not the product strategy. It is the code relationship layer that helps agents execute the strategy safely.

## Common Task Types

### Homepage Polish

Likely files:

- `app/[lang]/home-sections.tsx`
- `app/globals.css`
- `lib/dictionaries/zh.ts`
- `lib/dictionaries/en.ts`

Verification:

- `npm run build`
- local `/zh`
- local `/en`
- mobile viewport check if layout changed

### Copy Strategy

Likely files:

- `PRODUCT.md`
- `DESIGN.md`
- `lib/dictionaries/zh.ts`
- `lib/dictionaries/en.ts`
- `posts/`

Verification:

- `npm run build`
- visual scan of affected route

### Owner Writing Workflow

Likely files:

- `app/[lang]/admin/WritingDesk.tsx`
- `app/api/save-post/route.ts`
- `lib/posts.ts`
- `posts/`

Verification:

- `npm run build`
- owner mode manual check

