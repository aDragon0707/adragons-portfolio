# Task Packets

Use this folder for compact AI task packets before handing work to Codex, Claude Code, Cursor, or another agent.

## Packet Template

```text
TASK:

CONTEXT:

FILES TO READ FIRST:

CODEGRAPH QUESTIONS:

DO:

DO NOT:

VERIFICATION:

DELIVERABLE:
```

## Example

```text
TASK:
Polish the homepage project section so it reads like commercial proof, not a generic portfolio grid.

CONTEXT:
The site is a bilingual personal technology brand for an evidence-first AI systems builder.

FILES TO READ FIRST:
- AGENTS.md
- PRODUCT.md
- DESIGN.md
- docs/PROJECT_MAP.md
- app/[lang]/home-sections.tsx
- app/globals.css
- lib/dictionaries/zh.ts
- lib/dictionaries/en.ts

CODEGRAPH QUESTIONS:
- codegraph query HomeView
- codegraph query ProjectCard
- codegraph impact HomeView

DO:
- Improve hierarchy and scannability.
- Preserve ShadowBuyer, Agent Flight Recorder, and Solo AI Company OS.
- Keep Chinese and English corresponding but not literal.

DO NOT:
- Do not redesign the whole app.
- Do not expose private paths.
- Do not make owner-only plans public.

VERIFICATION:
- npm run build
- inspect /zh and /en

DELIVERABLE:
Changed files, short rationale, verification output, remaining risks.
```

