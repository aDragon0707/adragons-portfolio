---
title: "From Tokens to Agent Cost Design: Reading AI Bills and Building Workflows That Do Not Burn Context"
date: "2026-05-15"
channel: "tech"
featured: true
summary: "A first-principles note on tokens as cost, context, reasoning, output, and rework inside AI workflows."
tags: ["Tokens", "Agent Cost", "OpenAI", "DeepSeek"]
---

> This essay grew out of a series of questions I asked while learning how OpenAI and DeepSeek charge for tokens, how caching works, how reasoning tokens behave, why JSON schema and tool schema matter, and how different models should divide labor inside an agent workflow. The goal is not to memorize a pricing table. The goal is to build transferable judgment.

Updated: 2026-05-15

References:

- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [OpenAI GPT-5.5 Model](https://developers.openai.com/api/docs/models/gpt-5.5)
- [OpenAI Prompt Caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- [OpenAI Reasoning Models](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling)
- [DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [DeepSeek Token Usage](https://api-docs.deepseek.com/quick_start/token_usage)
- [DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache)
- [DeepSeek JSON Output](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode)

## 1. What This Essay Is Really About

Many people understand that tokens are the unit of billing, but still feel lost when they see a real API bill.

They know input, output, cached input, and reasoning tokens all matter, but they do not yet know how those categories change system design.

They know JSON mode, structured outputs, tool calls, and prompt caching are important, but they do not know where those things belong in a prompt.

They know DeepSeek is cheaper and GPT-class models are stronger, but they do not know whether a vague product idea should go to the cheaper model first or the stronger model first.

So the real question is not simply:

```text
What is a token?
```

The better question is:

```text
How should a person understand tokens as a combined measure of cost, context, reasoning, output, and rework inside an AI system?
```

If you only memorize prices, you get scattered facts.

If you understand the mechanism, you can start designing agent workflows.

## 2. First Principles: A Token Is Not a Character Count

The simple definition is:

```text
A token is the basic unit a model uses to represent and process text. It is also the basic unit used for API billing.
```

But the more useful engineering version is:

```text
A token is the smallest work unit the model reads, computes over, attends to, reasons with, and generates.
```

When a human understands an orange, we rely on color, smell, peel, pulp, taste, and memory.

When a model sees the word "orange", the path is different:

```text
text -> tokenizer -> token id -> embedding vector -> relationships with other tokens in context
```

The token id is only the entry point. The model's useful "understanding" comes from learned relationships across training data and the current context.

That is why the model can connect "orange" with fruit, citrus, vitamin C, peel, juice, sweet, and sour, even though it has not tasted an orange the way a person has.

## 3. An API Call Is a Token Receipt

A single API call roughly looks like this:

```text
input text
  -> tokenizer splits it into tokens
  -> model reads input tokens
  -> model may spend reasoning / thinking tokens
  -> model generates visible output tokens
  -> usage records the billable units
  -> provider charges by model price
```

The cost is not simply based on how many words you typed.

It is closer to:

```text
cost =
  uncached input tokens * input price
+ cached input tokens * cached input price
+ visible output tokens * output price
+ reasoning tokens * output-side price
+ tool call / tool result costs
```

Providers use different field names, but the accounting logic is similar.

## 4. A Concrete GPT-5.5 Cost Example

As of 2026-05-15, OpenAI's pricing page lists GPT-5.5 standard pricing as:

```text
Input:        $5.00 / 1M tokens
Cached input: $0.50 / 1M tokens
Output:       $30.00 / 1M tokens
```

That means:

```text
output is 6x input
input is 10x cached input
output is 60x cached input
```

Suppose one request uses:

```text
total input: 10,000 tokens
cached input: 8,000 tokens
uncached input: 2,000 tokens

visible answer: 800 tokens
reasoning tokens: 1,200 tokens
output-side total: 2,000 tokens
```

The rough cost is:

```text
uncached input:
2,000 * 5 / 1,000,000 = $0.010

cached input:
8,000 * 0.5 / 1,000,000 = $0.004

output + reasoning:
2,000 * 30 / 1,000,000 = $0.060

total:
$0.074
```

Without caching:

```text
10,000 * 5 / 1,000,000 + 2,000 * 30 / 1,000,000
= $0.050 + $0.060
= $0.110
```

The lesson is not just that caching saves money.

The deeper lesson is:

```text
Strong models should not be used to move information around.
Strong models should read clean evidence and produce high-value judgment.
```

## 5. The Four Main Token Categories

### Input Tokens

Input tokens are everything the model reads:

- system and developer instructions
- user prompt
- conversation history
- files
- web pages
- search results
- tool schemas
- JSON schemas
- structured output schemas
- visual tokens from images

Input tokens provide facts, rules, constraints, and context.

### Cached Input Tokens

Cached input tokens are input tokens that match reusable previous prompt prefixes.

They still count as tokens, but they are cheaper because the provider can reuse part of the previous computation.

Good cache candidates:

- stable identity
- project rules
- fixed output format
- fixed tool definitions
- fixed JSON schema
- stable project background

### Output Tokens

Output tokens are the visible answer the model writes.

They are often more expensive because generation is sequential. Every generated token affects the next one.

Output should serve a concrete purpose:

```text
judgment
conclusion
explanation
report
code
handoff
```

Do not let the model spend expensive output tokens on process narration that no one will use.

### Reasoning / Thinking Tokens

Reasoning tokens are the model's thinking budget before the final answer.

They are useful for:

- architecture decisions
- difficult debugging
- multi-constraint product design
- security review
- business tradeoffs
- long agent workflows

They are usually wasteful for:

- simple classification
- field extraction
- translation
- format conversion
- fixed template generation

The rule:

```text
Do not use deep reasoning for simple mechanical work.
```

## 6. DeepSeek Pricing: Cheap Still Needs Design

As of 2026-05-15, DeepSeek's pricing page shows separate rates for cache-hit input, cache-miss input, and output. The exact numbers may change, so the official page should remain the source of truth.

The key design lesson is stable:

```text
DeepSeek becomes much cheaper when stable prefixes hit cache.
Output is still expensive relative to cache-hit input.
Thinking should be disabled or lowered for simple tasks.
```

So do not treat "cheap model" as a license to dump everything into context.

Cheap models still need clean context boundaries.

## 7. Caching Is Not Magic: Stable Prefix First, Dynamic Content Last

Prompt caching depends on repeated prefixes.

A cache-friendly prompt order looks like this:

```text
stable identity / role
stable project rules
stable output format
stable tool schema
stable JSON schema
today's task
today's files / web pages
today's evidence
```

A cache-hostile order looks like this:

```text
today's task
temporary file contents
random user additions
stable rules
output schema
project background
```

Why is the second order bad?

Because the beginning changes every time. If the prefix changes, later stable content is less useful for cache reuse.

## 8. Tool Schema and JSON Schema

The simplest distinction:

```text
tool schema = the instruction manual for actions the model can call
JSON schema = the answer template the model must fill
```

### Tool Schema

A tool schema tells the model:

```text
what tool exists
what the tool is called
when to use it
what parameters it needs
which parameters are required
what extra parameters are forbidden
```

Example:

```json
{
  "type": "function",
  "name": "search_notes",
  "description": "Search local notes by keyword.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The keyword or question to search for."
      },
      "limit": {
        "type": "integer",
        "minimum": 1,
        "maximum": 10
      }
    },
    "required": ["query"],
    "additionalProperties": false
  }
}
```

### JSON Schema

A JSON schema tells the model what shape the final answer must have.

Example:

```json
{
  "type": "object",
  "properties": {
    "summary": {
      "type": "string"
    },
    "risks": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "confidence": {
      "type": "string",
      "enum": ["low", "medium", "high"]
    }
  },
  "required": ["summary", "risks", "confidence"],
  "additionalProperties": false
}
```

The desired answer is then shaped like:

```json
{
  "summary": "One-sentence summary",
  "risks": ["Evidence is incomplete", "Cost may be high"],
  "confidence": "medium"
}
```

The metaphor:

```text
tool schema = remote control manual
JSON schema = assignment form
```

## 9. Does JSON Burn More Tokens

For a single call, yes, often.

You need schema or examples in the prompt, and the output includes field names, quotes, braces, and commas.

But total system cost may still go down because structured output reduces:

- retries
- manual cleanup
- parsing failures
- downstream bugs
- rework communication

The better formula is:

```text
real cost = single-call token cost * retry count + parsing failure cost + human repair cost
```

Use structured outputs for critical pipelines.

Do not over-JSON every casual draft.

## 10. If You Do Not Understand the Task Yet, How Do You Pick a Model

Do not guess immediately.

Use a probe.

A probe does not solve the task. It decides how the task should be solved.

Example probe:

```text
You are a task router. Do not solve the task. Only choose the processing route.

Input:
{user_idea_or_task}

Return JSON:
{
  "task_type": "extract|translate|classify|brainstorm|plan|research|code|decision|unknown",
  "ambiguity": "low|medium|high",
  "needs_first_hand_sources": true,
  "needs_reasoning": "none|low|medium|high",
  "risk_level": "low|medium|high",
  "suggested_model": "cheap|strong|strong_reasoning",
  "next_step": "ask_clarifying_question|make_receipt|retrieve_sources|draft_plan|execute",
  "why": "one-sentence explanation"
}

Rules:
- Do not expand the answer.
- Do not solve the user's problem.
- If the task is format conversion, extraction, or translation, needs_reasoning = none.
- If the goal is ambiguous and value judgment matters, suggested_model = strong.
- If a lot of source material must be filtered, retrieve sources first.
```

For a vague idea like:

```text
I want to build an AI companion knowledge base that helps me learn, start projects, reflect, and generate action plans.
```

The probe should probably say:

```json
{
  "task_type": "brainstorm",
  "ambiguity": "high",
  "needs_first_hand_sources": false,
  "needs_reasoning": "medium",
  "risk_level": "medium",
  "suggested_model": "strong",
  "next_step": "make_receipt",
  "why": "This is a high-ambiguity product definition task. It needs framing before cheap expansion."
}
```

## 11. How DeepSeek and GPT-Class Models Should Divide Labor

My current rule:

```text
wild idea -> strong model first for framing
large source pile -> DeepSeek first for evidence receipts
final judgment -> strong model again
```

Do not interpret "cheap" as "always first."

If the first cut is wrong, everything after it may become cheaply wrong.

A better loop:

```text
user -> strong model:
turn messy intent into a task map, boundaries, and assumptions

strong model -> DeepSeek:
extract, classify, expand, summarize sources, build competitor tables

DeepSeek -> strong model:
return evidence receipts; strong model compresses, judges, and decides
```

DeepSeek first is good when:

```text
1. You already know what to extract.
2. The task is bulk extraction, classification, translation, or formatting.
3. High-value judgment is not required.
4. There is a lot of source text but only evidence snippets are needed.
```

Strong model first is better when:

```text
1. You do not know what you really want yet.
2. The task involves product direction, business judgment, or architecture.
3. Sources conflict.
4. A wrong first direction would waste many later steps.
```

One sentence:

```text
DeepSeek is good as an evidence worker and junior planner.
Strong models are better as chief architect and final reviewer.
```

## 12. Real Token Savings Come From Context Control

Many people think token saving means:

```text
write shorter prompts
```

That is only partly true.

The real rule is:

```text
Do not put unnecessary material into context.
```

Do not feed the model full versions of:

- raw HTML
- full test logs
- full git diffs
- full chat history
- full repository trees
- full document libraries

Instead:

```text
keep full material on disk
give the model:
  path
  hash
  exit_code
  key_excerpt
  summary
  unresolved_question
```

This is the receipt idea.

A tiny receipt can look like:

```text
Goal:
Known facts:
Decision boundary:
Next action:
Stop if:
Full logs:
```

Its job is to replace long history with a short, verifiable state packet.

## 13. A Reusable Prompt Order

For agent workflows, use:

```text
STATIC PREFIX:
  stable identity
  stable project rules
  stable output format
  fixed tool schema
  fixed JSON schema

DYNAMIC TASK:
  today's goal
  allowed scope
  files / URLs to read

EVIDENCE TAIL:
  latest evidence summary
  test exit code
  diff summary
  source paths
  unresolved questions
```

This structure helps with:

```text
1. better cache hits
2. less wasted context
3. easier handoff to another model or agent
```

## 14. A Minimal Token Task Card

For each AI task, write something like:

```json
{
  "task_id": "token-study-001",
  "model": "gpt-5.5 | gpt-5.4-mini | deepseek-v4-flash | deepseek-v4-pro",
  "reasoning_effort": "none | low | medium | high",
  "input_policy": {
    "static_prefix": [],
    "dynamic_task": [],
    "evidence_tail": []
  },
  "output_policy": {
    "max_output_tokens": 800,
    "format": "markdown | json | schema",
    "must_include": ["verdict", "evidence", "next_action"],
    "must_not_include": ["long process narration", "full logs"]
  },
  "cache_policy": {
    "stable_prefix_first": true,
    "track_cached_tokens": true,
    "deepseek_track": ["prompt_cache_hit_tokens", "prompt_cache_miss_tokens"],
    "openai_track": ["cached_tokens", "reasoning_tokens"]
  },
  "verdict": "continue | split | compact | stop"
}
```

The point is not that the card looks neat.

The point is that it forces these questions:

```text
What exactly should the model read?
What should it write?
Which content is stable enough to cache?
Which evidence must be preserved?
Does this task really need reasoning?
Can a receipt replace the full history?
```

## 15. The Main Principle

```text
Tokens are a unified measure of compute, context, attention, reasoning, output, and rework inside an AI system.
```

Saving tokens is not about saying less.

It is about:

```text
making every token serve decision, execution, verification, or handoff
```

For an AI builder, the important questions become:

```text
What should go to the strong model?
What should go to the cheap model?
What belongs in the stable cache prefix?
What needs a schema?
What should stay on disk?
What should become a receipt?
What should be stopped?
```

That is the step from prompt user to agent system designer.

## 16. The Three-Part Toolkit I Built From This Thinking

This essay should not stay at the concept level.

I turned this token, context, model-routing, and audit thinking into three composable Codex skills / agent tools.

```text
agent-cost-router
= decide the cheapest and safest route before execution
= choose the model, context budget, probe need, and skill route
https://github.com/aDragon0707/agent-cost-router
```

```text
token-prompt-compiler
= compile messy human requests into executable task packets before work starts
= produce Tiny Packet / Standard Packet / Worker Packet / Micro Receipt
https://github.com/aDragon0707/token-prompt-compiler
```

```text
audit-evolution
= do lightweight review and continuity after work finishes
= produce Tiny Audit / Evidence Receipt / Clean-State Packet
currently a local skill, not yet uploaded as an independent GitHub repo
C:\Users\86181\.codex\skills\audit-evolution
```

The simplest workflow:

```text
1. agent-cost-router
   choose the route: how to save tokens, which model to use, how much to read
   https://github.com/aDragon0707/agent-cost-router

2. token-prompt-compiler
   compile the task: turn the request into the smallest useful task packet
   https://github.com/aDragon0707/token-prompt-compiler

3. audit-evolution
   close the loop: record evidence, lessons, and the next step
   local path: C:\Users\86181\.codex\skills\audit-evolution
```

One sentence:

```text
router chooses the route
compiler compiles the task
audit preserves the learning
```

If the earlier sections explain why tokens get burned, this toolkit is my practical answer:

```text
choose the route first, compile the task second, preserve the learning last
```
