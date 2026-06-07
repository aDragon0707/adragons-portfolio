# CodeGraph A/B Evaluation - 2026-06-07

Use these real tasks to compare agent behavior with and without CodeGraph.

## Metrics

- Files read.
- Tool calls.
- Time to first correct file.
- Whether the impact radius was correct.
- Whether the agent edited an unrelated file.
- Whether final verification was stronger or weaker.

## How To Run

For each task, run two attempts:

1. Baseline: do not allow CodeGraph.
2. CodeGraph: require `codegraph status`, one targeted `query` or `files`, and one `impact`, `callers`, `callees`, or `affected` command when relevant.

Record the result in `docs/receipts/`.

## Task Matrix

| # | Type | Repo | Task |
|---|---|---|---|
| 1 | architecture | Portfolio | Map the homepage data flow from route entry to rendered project cards. |
| 2 | where-is | Portfolio | Find where the ShadowBuyer project title and PDF links are defined. |
| 3 | impact | Portfolio | Identify what changes if `HomeView` is edited. |
| 4 | bug trace | Portfolio | Explain the known `npm run build` failure around generated `.next/dev/types/validator.ts`. |
| 5 | UI polish | Portfolio | Locate the smallest styling surface for improving homepage project-card readability. |
| 6 | architecture | Booking | Locate the coordinator, worker, and reviewer implementation surfaces. |
| 7 | impact | Booking | Estimate the impact of changing the analyzer/reviewer data flow. |
| 8 | where-is | Solo AI Company OS | Find the public-facing AgentOps Doctor or SACP documentation entrypoint. |
| 9 | architecture | Socrates Focus | Locate the frontend and backend entrypoints and describe how they connect. |
| 10 | bug trace | Project Core | Trace the ShadowBuyer analyzer/main/reviewer execution flow before proposing a fix. |

## Passing Standard

CodeGraph is worth keeping if it reduces blind file reading and tool calls without lowering correctness. Star count, hype, or benchmark claims are not enough; the local task results decide.

