# Dehydration Protocol: SACP x Audit Evolution

Purpose: turn noisy AI work into a small, auditable receipt that can be shipped, reviewed, resumed, or rejected.

## Core Rule

Do not preserve the conversation. Preserve the claim, evidence, decision, fix, and next action.

## When To Use

- After an AI agent finishes a task.
- After a demo, hackathon submission, client pilot, or bug fix.
- Before promoting anything into memory, website copy, project docs, or public claims.
- When the thread is long and the next person needs state without the full context.

## SACP Receipt Shape

```yaml
sacp_receipt:
  receipt_id: SACP-YYYYMMDD-shortname
  agent_or_operator: codex | human | other
  task: one sentence
  status_code: 200 | 206 | 412 | 500
  claim: what the work says is true
  evidence:
    - file_or_url:
      check:
      result:
  unsupported_claims:
    - claim:
      missing_evidence:
  required_fix:
    - action:
      owner:
  decision: accept | accept_with_notes | revise | reject
  receipt_hash_target: optional chain/file/hash anchor
```

Status codes:

- `200`: evidence supports the claim.
- `206`: partially supported, usable with stated limits.
- `412`: claim cannot be promoted until missing evidence is fixed.
- `500`: task failed or output is unsafe to rely on.

## Audit Evolution Layer

```yaml
audit_evolution:
  evidence:
    verified:
      - build/test/screenshot/file
    missing:
      - what was not checked
  correction:
    - what changed because of the audit
  one_evolution:
    - the reusable lesson
  next_check:
    - the smallest verification step
  stop_or_continue: continue | stop
```

## Dehydration Steps

1. Extract the strongest claim.
2. Attach only the evidence that proves or weakens it.
3. Mark unsupported claims as `SACP 412`, not as success.
4. Produce exactly one correction or next patch.
5. Promote only the dehydrated receipt, not the raw thread.

## Website / Portfolio Gate

Before publishing a project claim:

```yaml
publish_gate:
  claim: 
  proof_object: repo | report | demo | screenshot | receipt
  public_risk: low | medium | high
  private_data_removed: yes | no
  can_a_stranger_verify: yes | no
  decision: publish | rewrite | hold
```

## Example

```yaml
sacp_receipt:
  receipt_id: SACP-20260515-portfolio-mobile-receipt
  agent_or_operator: codex
  task: Fix mobile receipt overflow and create reusable dehydration protocol.
  status_code: 206
  claim: Mobile receipt panel no longer exposes long SACP tokens in the narrow layout.
  evidence:
    - file_or_url: D:/Upwork-Portfolio/app/[lang]/home-sections.tsx
      check: mobile short receipt text added
      result: full desktop text and short mobile text both renderable
    - file_or_url: D:/Upwork-Portfolio/app/globals.css
      check: mobile CSS hides full receipt and shows short receipt
      result: long token risk reduced
  unsupported_claims:
    - claim: All mobile layouts are perfect.
      missing_evidence: full visual QA across all sections and browsers
  required_fix:
    - action: screenshot mobile hero after server refresh
      owner: codex
  decision: accept_with_notes
  receipt_hash_target: optional

audit_evolution:
  evidence:
    verified:
      - npm run build passes
    missing:
      - manual browser approval from Alan
  correction:
    - long receipt strings are dehydrated on mobile
  one_evolution:
    - public proof should be complete on desktop and compressed on mobile
  next_check:
    - inspect http://localhost:3000/zh on phone width
  stop_or_continue: continue
```

## Reusable Prompt

```text
Use SACP x Audit Evolution.
Extract the claim, evidence, unsupported claims, required fix, decision, one lesson, and next check.
Return a dehydrated receipt only. Do not summarize the whole conversation.
```
