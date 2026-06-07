# Claude Task Packet: Homepage + Projects UI Polish

MODE:
Plan first, execute second. In the first Claude Code run, do not edit files. Produce a design/implementation plan and stop for human approval. Only implement after the user explicitly says to execute the approved plan.

TASK:
Optimize the ADRAGON bilingual personal technology brand site, starting with `/zh` homepage and `/zh/projects`. Improve typography, spacing rhythm, button treatment, border radius, layout flow, card hierarchy, and future content extensibility for tech writing, skills, prompts, agents, and personal thinking modules.

CONTEXT:
This is not a generic portfolio and not a SaaS landing page. It is a high-trust personal IP site for an evidence-first AI systems builder. The site should feel like a maintained personal lab: warm, mechanical, careful, proof-driven, and readable.

READ FIRST:
- `AGENTS.md`
- `CLAUDE.md`
- `PRODUCT.md`
- `DESIGN.md`
- `docs/PROJECT_MAP.md`
- `app/[lang]/home-sections.tsx`
- `app/[lang]/projects/page.tsx`
- `app/globals.css`
- `lib/dictionaries/zh.ts`
- `lib/dictionaries/en.ts`

CODEGRAPH QUESTIONS:
- `codegraph status`
- `codegraph query HomeView`
- `codegraph impact HomeView`
- `codegraph query ProjectsPage`
- `codegraph query WritingSection`

PHASE 1: PLAN / DESIGN BRIEF ONLY
Allowed:
- Read the files listed above.
- Use CodeGraph for structural navigation.
- Inspect local `/zh`, `/en`, `/zh/projects`, and `/en/projects` if a dev server is already running, or start one only if needed for visual inspection.
- Take screenshots or notes if useful.
- Produce a concrete plan.

Not allowed:
- Do not edit files.
- Do not run formatters that rewrite files.
- Do not add dependencies.
- Do not commit.
- Do not deploy.

Phase 1 output must include:
- Diagnosis: top 5 issues on homepage and top 5 issues on projects page.
- Design direction: one paragraph describing the target feeling and visual system.
- Proposed structure: homepage and projects page section order.
- Typography plan: heading scale, body line length, Chinese readability rules, letter-spacing rule.
- Layout plan: section rhythm, grid behavior, project grouping, future writing/module slots.
- Component plan: buttons, links, project proof rows, cards, tags, status labels.
- Files likely to change.
- Verification plan.
- Risks and tradeoffs.
- Stop line: `WAITING_FOR_APPROVAL_BEFORE_EDITING`.

PHASE 2: EXECUTION AFTER APPROVAL
Only after human approval:
- Make the narrowest implementation that satisfies the approved plan.
- Prefer CSS and component layout changes before copy rewrites.
- Keep all changes reversible and easy to review.
- Write a receipt after meaningful work.

UI SKILL ROUTING:
Use this sequence if the local Claude environment has these skills:

In Phase 1:

1. `impeccable critique /zh and /zh/projects`
   - Diagnose hierarchy, typography, rhythm, spacing, cards, buttons, bilingual readability, mobile behavior.
2. `impeccable shape homepage + projects page`
   - Produce a concrete layout direction and stop before editing.

In Phase 2:

3. `impeccable typeset homepage + projects page`
   - Fix font scale, line length, Chinese readability, heading width, body rhythm, link/button text fit.
4. `impeccable layout homepage + projects page`
   - Fix section rhythm, grid structure, project ledger hierarchy, writing-section expansion slots.
5. `impeccable colorize` only if needed
   - Keep restrained warm paper + charcoal + quiet blue + green/amber signals. Do not introduce purple-gradient AI styling.
6. `impeccable polish`
   - Final interaction states, hover, button weight, border radius, spacing consistency.
7. `impeccable adapt`
   - Verify mobile around 390px and desktop around 1440px.
8. `impeccable audit`
   - Accessibility, contrast, overflow, responsive layout, build sanity.

If `impeccable` is unavailable, use equivalent frontend-design discipline:
- critique first
- shape before code
- typeset/layout before decoration
- polish/adapt/audit before completion

DESIGN INTENT:
- Homepage first viewport should say who I am, what I build, why evidence matters, and where to inspect proof.
- Projects section should feel like a proof index, not repeated cards.
- `/zh/projects` should group projects by role:
  - cash-flow proof: ShadowBuyer
  - agent trust proof: Agent Flight Recorder
  - operating system proof: Solo AI Company OS
  - learning systems: Reading Reflection OS, IELTS Assistant, Socrates Focus
- Tech writing should have future lanes for:
  - skills
  - prompts
  - agents
  - CodeGraph / MCP / local-first agent tooling
  - audit receipts
- Personal thinking should support small modules without becoming emotional diary:
  - growth path
  - do / do not
  - compound loop
  - current learning edge
  - reflections tied back to shipped artifacts

DO:
- Keep Chinese and English corresponding but not literal translations.
- Make headings mostly single-line on desktop when reasonable.
- Center short descriptive text when it improves clarity, but keep long reading surfaces left-aligned.
- Use stable spacing tokens and section rhythm.
- Reduce visual sameness between cards.
- Make buttons feel trustworthy and intentional, not generic pills everywhere.
- Use cards only where they frame repeated items or proof objects.
- Make future blog modules easy to add without redesigning the page again.

DO NOT:
- Do not redesign from scratch.
- Do not remove ShadowBuyer, Agent Flight Recorder, Solo AI Company OS, SACP, receipts, evidence, audit, or solo-company thesis.
- Do not expose private local paths or private strategy.
- Do not make the owner-only 7-Day Read-to-Ship loop public.
- Do not add purple gradients, glassmorphism, neon cyberpunk, big SaaS metric tiles, or identical card grids.
- Do not add new dependencies unless absolutely necessary.
- Do not edit generated `.next` or `.codegraph` files.

TARGET FILES:
- Primary: `app/[lang]/home-sections.tsx`, `app/[lang]/projects/page.tsx`, `app/globals.css`
- Copy if needed: `lib/dictionaries/zh.ts`, `lib/dictionaries/en.ts`
- Docs after meaningful work: `docs/receipts/`

PHASE 2 VERIFICATION:
- `codegraph sync`
- `npm run build`
- Inspect `/zh` and `/zh/projects`
- Inspect `/en` and `/en/projects`
- Check mobile around 390px and desktop around 1440px
- Confirm no horizontal overflow
- Confirm text does not overlap buttons, cards, or adjacent sections
- Confirm `.codegraph/`, `.next/`, `.env.local`, screenshots, and logs are not committed

DELIVERABLE:
Phase 1:
- Plan only.
- No changed files.
- End with `WAITING_FOR_APPROVAL_BEFORE_EDITING`.

Phase 2:
- Changed files
- Short design rationale
- Before/after notes for homepage and projects page
- Verification output
- Remaining risks
