---
title: "从 Token 到 Agent 成本设计：普通人如何看懂 AI 账单，并设计不烧钱的工作流"
date: "2026-05-15"
channel: "tech"
featured: true
summary: "从第一性原理理解 token：它同时是成本、上下文、推理、输出和返工管理问题。"
tags: ["Token", "Agent 成本", "OpenAI", "DeepSeek"]
---
> 本文整理自我对 OpenAI、DeepSeek token 消耗、计费、缓存、reasoning、JSON schema、tool schema 和 Agent 分工的连续学习提问。目标不是背价格表，而是建立一套能迁移到真实 AI 工作流里的判断能力。

更新时间：2026-05-15

参考资料：

- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [OpenAI GPT-5.5 Model](https://developers.openai.com/api/docs/models/gpt-5.5)
- [OpenAI Prompt Caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- [OpenAI Reasoning Models](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI Function Calling](https://developers.openai.com/api/docs/guides/function-calling)
- [DeepSeek 模型与价格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
- [DeepSeek Token 用量计算](https://api-docs.deepseek.com/zh-cn/quick_start/token_usage)
- [DeepSeek Context Caching](https://api-docs.deepseek.com/guides/kv_cache)
- [DeepSeek JSON Output](https://api-docs.deepseek.com/zh-cn/guides/json_mode/)
- [DeepSeek Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode)

## 1. 这篇文章到底想解决什么问题

很多人学 token，会卡在一个很尴尬的位置：

知道 token 是计费单位，但不知道它和“理解”有什么关系。

知道 input、output、cached input、reasoning tokens 都会计费，但看到账单还是懵。

知道 JSON mode、tool calls、structured outputs、prompt caching 很重要，但不知道这些东西应该放在 prompt 的哪里。

知道 DeepSeek 便宜、GPT 强，但不知道一个天马行空的想法应该先交给谁。

所以这篇文章的核心问题不是“token 是什么”，而是：

```text
普通人如何把 token 理解成 AI 系统里的成本、上下文、推理、输出和返工管理问题？
```

如果只背价格表，你会得到一些零散知识。

如果理解它背后的机制，你会开始设计自己的 Agent 工作流。

## 2. Token 的第一性原理：它不是字数，而是模型的工作单位

最简单的说法：

```text
token 是模型处理文本的基本单位，也是 API 计费的基本单位。
```

但这个说法还不够有感觉。

可以换成更接近工程直觉的版本：

```text
token 是模型每次读取、计算、注意、推理和生成时要处理的最小工作单元。
```

比如人类理解“橙子”：

```text
颜色
气味
果皮
果肉
酸甜味
过去吃橙子的记忆
```

模型理解“橙子”：

```text
文本 -> tokenizer 切成 token -> token id -> embedding 向量 -> 在上下文里与其他 token 产生关系
```

所以 token 背后不是简单的“身份编码”。token id 只是入口，模型真正用来“理解”的，是它在训练中学到的向量关系和上下文关系。

比如“橙子”和“水果、维生素 C、果皮、橘子、酸甜、果汁”经常一起出现，模型就在大量语料中学到这些关系。

这也解释了一个重要事实：

```text
模型不是像人一样闻到橙子、尝到橙子。
模型是在文本和多模态数据中学到“橙子通常意味着什么”。
```

## 3. 一次 API 调用，本质上是一张 token 小票

一次 API 调用大致长这样：

```text
输入文本
  -> tokenizer 切成 tokens
  -> 模型读取 input tokens
  -> 模型可能产生 reasoning / thinking tokens
  -> 模型生成 visible output tokens
  -> usage 记录消耗
  -> 按模型单价扣费
```

所以费用不是按“字数”直接计算，而是类似：

```text
费用 =
  未缓存 input tokens * input 单价
+ 缓存命中 input tokens * cached input 单价
+ visible output tokens * output 单价
+ reasoning tokens * output 侧单价
+ tool call / tool result 带来的额外成本
```

不同厂商字段名可能不同，但账本逻辑类似。

## 4. 用 GPT-5.5 算一笔具体账

截至 2026-05-15，OpenAI 官方页面显示 GPT-5.5 标准价格为：

| 类型 | 单价 |
|---|---:|
| Input | $5.00 / 1M tokens |
| Cached input | $0.50 / 1M tokens |
| Output | $30.00 / 1M tokens |

这意味着：

```text
output = input 的 6 倍价格
input = cached input 的 10 倍价格
output = cached input 的 60 倍价格
```

假设一次请求：

```text
总输入：10,000 tokens
其中缓存命中：8,000 tokens
未缓存输入：2,000 tokens

最终可见输出：800 tokens
推理消耗：1,200 tokens
输出侧合计：2,000 tokens
```

那么费用是：

```text
未缓存 input:
2,000 * 5 / 1,000,000 = $0.010

cached input:
8,000 * 0.5 / 1,000,000 = $0.004

output + reasoning:
2,000 * 30 / 1,000,000 = $0.060

总计：
$0.010 + $0.004 + $0.060 = $0.074
```

如果没有缓存：

```text
10,000 * 5 / 1,000,000 + 2,000 * 30 / 1,000,000
= $0.050 + $0.060
= $0.110
```

这里最重要的结论不是“缓存省了多少钱”，而是：

```text
强模型的贵，往往贵在输出和推理。
不要让强模型搬运信息。
要让强模型读干净证据，输出高价值判断。
```

## 5. Token 消耗到底分几类

### 5.1 Input tokens：模型读进去的东西

Input tokens 包括：

- system / developer instructions
- user prompt
- 历史对话
- 文件内容
- 网页内容
- 搜索结果
- 工具 schema
- JSON schema
- structured output schema
- 图片转成的视觉 token

它负责：

```text
给事实
给规则
给上下文
给约束
```

### 5.2 Cached input tokens：命中缓存的旧前缀

cached input tokens 仍然是 tokens，但价格更低，因为系统可以复用一部分前面已经计算过的内容。

适合放进缓存的内容：

- 稳定身份
- 项目规则
- 固定输出格式
- 固定工具定义
- 固定 JSON schema
- 长期不变的项目背景

### 5.3 Output tokens：模型写出来的最终答案

Output tokens 通常比 input 贵，因为生成是一步一步解码。模型每生成一个 token，都要继续影响后面的 token。

它负责：

```text
判断
结论
解释
报告
代码
可交付文本
```

设计原则：

```text
不要让模型长篇输出过程废话。
输出要服务于决策、执行、验证或交接。
```

### 5.4 Reasoning / thinking tokens：模型的思考预算

Reasoning tokens 是推理模型在最终回答前产生的思考消耗。

OpenAI 的 reasoning tokens 通常不直接把原文暴露给用户，但会占上下文窗口，并计入输出侧成本。

DeepSeek thinking mode 会通过 `reasoning_content` 返回思维链内容，同时还有最终 `content`。

关键判断：

```text
reasoning tokens 只应该花在高不确定性和高价值判断上。
```

不适合开高 reasoning 的任务：

- 简单分类
- 字段提取
- JSON 格式转换
- 翻译
- 固定模板生成

适合开 reasoning 的任务：

- 架构判断
- 复杂 debug
- 多约束产品设计
- 安全审查
- 商业取舍
- 长链路 Agent 规划

## 6. DeepSeek 价格怎么读：便宜，但也要会用

截至 2026-05-15，DeepSeek 中文官方价格页面显示：

| 模型 | 缓存命中 input / 1M | 缓存未命中 input / 1M | Output / 1M |
|---|---:|---:|---:|
| deepseek-v4-flash | 0.02 元 | 1 元 | 2 元 |
| deepseek-v4-pro | 0.025 元，优惠期 | 3 元，优惠期 | 6 元，优惠期 |

DeepSeek 还说明 deepseek-v4-pro 当前 2.5 折优惠期延长至北京时间 2026-05-31 23:59，产品价格可能变化，需要定期查看官方页面。

从比例看：

```text
deepseek-v4-flash:
未命中 input = 命中 input 的 50 倍
output = 命中 input 的 100 倍

deepseek-v4-pro:
未命中 input = 命中 input 的 120 倍
output = 命中 input 的 240 倍
```

所以 DeepSeek 的省钱核心是：

```text
稳定前缀尽可能命中缓存。
不要滥用长输出。
简单任务关闭或降低 thinking。
```

## 7. 缓存不是玄学：稳定内容放前面，变量内容放后面

OpenAI prompt caching 的核心是：

```text
缓存命中依赖 prompt 的前缀匹配。
静态内容放前面，变量内容放后面。
```

DeepSeek Context Caching 也强调：后续请求如果和之前请求有重叠前缀，重叠部分才可能命中缓存。DeepSeek 的 usage 里有两个字段：

```text
prompt_cache_hit_tokens
prompt_cache_miss_tokens
```

正确 prompt 排序：

```text
稳定身份 / 角色
稳定项目规则
稳定输出格式
稳定工具 schema
稳定 JSON schema
今天的任务
今天的文件 / 网页
今天的证据
```

错误 prompt 排序：

```text
今天的任务
临时文件
用户随口补充
稳定规则
输出 schema
项目背景
```

为什么错？

因为变量内容放在前面，每次请求开头都变，后面的稳定规则就不容易形成可复用前缀。

## 8. Tool schema 和 JSON schema：一个是工具说明书，一个是交作业模板

很多人第一次看到 schema 会懵。

其实只要分清两件事：

```text
tool schema = 告诉模型可以调用什么工具，以及工具需要什么参数
JSON schema = 告诉模型最终答案必须长成什么结构
```

### 8.1 Tool schema 是动作接口

比如：

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

它的意思是：

```text
type: function
= 这是一个可调用工具

name: search_notes
= 工具名字

description
= 告诉模型什么时候该用它

parameters
= 这个工具接收什么参数

properties
= 参数有哪些字段

required
= 哪些字段必须给

additionalProperties: false
= 不允许模型乱造额外参数
```

### 8.2 JSON schema 是答案结构

比如：

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

它希望模型最终输出：

```json
{
  "summary": "一句话总结",
  "risks": ["证据不足", "成本可能高"],
  "confidence": "medium"
}
```

最简单的比喻：

```text
tool schema = 遥控器按钮说明书
JSON schema = 交作业的表格模板
```

## 9. JSON 会不会多烧 token

单次看，会。

因为 prompt 里要写 schema / example，output 里也会多出字段名、引号、括号、逗号。

但总成本看，可能省。

因为它减少了：

- 重试
- 人工清洗
- 二次解析
- 下游 bug
- 返工沟通

所以公式应该是：

```text
真实成本 = 单次 token 成本 * 重试次数 + 解析失败成本 + 人工修复成本
```

系统设计原则：

```text
关键链路用结构化输出。
非关键草稿不用过度 JSON 化。
```

## 10. 没读懂任务前，怎么知道用什么模型

不要一开始就猜。用“探针调用”。

探针不是解决问题，而是判断问题应该怎么被解决。

一个极简探针可以这样写：

```text
你是任务路由器，不解决任务，只判断处理路径。

输入：
{user_idea_or_task}

请返回 JSON：
{
  "task_type": "extract|translate|classify|brainstorm|plan|research|code|decision|unknown",
  "ambiguity": "low|medium|high",
  "needs_first_hand_sources": true,
  "needs_reasoning": "none|low|medium|high",
  "risk_level": "low|medium|high",
  "suggested_model": "cheap|strong|strong_reasoning",
  "next_step": "ask_clarifying_question|make_receipt|retrieve_sources|draft_plan|execute",
  "why": "一句话解释"
}

规则：
- 不要展开答案
- 不要替用户做规划
- 如果只是格式转换/抽取/翻译，needs_reasoning = none
- 如果目标模糊但价值判断重，suggested_model = strong
- 如果需要大量资料筛选，先 retrieve_sources
```

比如用户说：

```text
我想做一个 AI 陪跑型知识库，能帮我学习、创业、复盘、自动生成行动计划。
```

探针应该返回：

```json
{
  "task_type": "brainstorm",
  "ambiguity": "high",
  "needs_first_hand_sources": false,
  "needs_reasoning": "medium",
  "risk_level": "medium",
  "suggested_model": "strong",
  "next_step": "make_receipt",
  "why": "这是高模糊度产品定义问题，先需要框架化，不适合直接交给便宜模型扩写。"
}
```

## 11. DeepSeek 和 GPT / Codex 应该怎么分工

我的判断：

```text
天马行空的想法：先交给强模型做第一轮框架化
大量资料整理：交给 DeepSeek 做 evidence receipt
最终判断和路线取舍：回到强模型
```

不要把“便宜”理解成永远先用便宜模型。

如果第一步方向切错，后面就会便宜地跑偏。

更稳的链路是：

```text
用户 -> 强模型：
把混沌想法变成任务地图、边界、关键假设

强模型 -> DeepSeek：
让它做扩展、分类、资料摘录、竞品表、字段抽取

DeepSeek -> 强模型：
带 evidence receipt 回来，由强模型做判断、压缩、决策
```

什么时候 DeepSeek 先上？

```text
1. 已经知道要整理什么
2. 任务是批量抽取 / 分类 / 翻译 / 格式化
3. 不需要高价值判断
4. 原文很多，但只需要证据摘录
```

什么时候强模型先上？

```text
1. 你还不知道自己到底要什么
2. 任务涉及产品方向、商业判断、架构选择
3. 信息有冲突
4. 错一步会导致后续大量浪费
```

一句话：

```text
DeepSeek 适合当资料员和初级规划员。
强模型适合当总设计师和审稿人。
```

## 12. 真正省 token 的不是“写短 prompt”，而是上下文控制

很多人以为省 token 是：

```text
把 prompt 写短。
```

这只对了一小半。

真正省 token 是：

```text
不把不该进上下文的东西塞进去。
```

比如不要把这些直接喂给模型：

- 完整网页 HTML
- 完整测试日志
- 完整 git diff
- 完整聊天历史
- 完整仓库树
- 完整资料库

应该改成：

```text
完整内容落盘。
模型只读：
  path
  hash
  exit_code
  key_excerpt
  summary
  unresolved_question
```

这就是 receipt 思路。

一个 Micro Receipt 可以长这样：

```text
Goal:
Known facts:
Decision boundary:
Next action:
Stop if:
Full logs:
```

它的作用是：

```text
用一个短的、可验证的状态包，代替长历史。
```

## 13. Prompt 排序模板：稳定前缀 + 当前任务 + 证据尾巴

一个更适合 Agent 的 prompt 结构：

```text
STATIC PREFIX:
  稳定身份
  稳定项目规则
  稳定输出格式
  固定工具 schema
  固定 JSON schema

DYNAMIC TASK:
  今天的目标
  允许范围
  必须读的文件 / URL

EVIDENCE TAIL:
  最新证据摘要
  test exit code
  diff summary
  source paths
  unresolved questions
```

这套结构同时服务于三件事：

```text
1. 更容易命中缓存
2. 更少上下文浪费
3. 更容易被另一个模型或 Agent 接手
```

## 14. 最小实践：今晚就能用的 token 任务卡

可以把每个 AI 任务都写成这个结构：

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

这张卡的意义不是好看，而是逼自己每次都问：

```text
我到底要模型读什么？
我要它写什么？
哪些内容稳定可缓存？
哪些证据必须保留？
这个任务真的需要 reasoning 吗？
能不能先用 receipt 代替全文？
```

## 15. 一句话总纲

```text
Token 是 AI 系统里的计算、上下文、注意力、推理、输出和返工成本的统一度量。
```

省 token 的本质不是少说话，而是：

```text
让每个 token 都服务于决策、执行、验证或交接。
```

对于个人用户和 AI 创业者来说，理解 token 不是为了抠几分钱，而是为了建立一种新的系统设计能力：

```text
什么该给强模型？
什么该给便宜模型？
什么该放缓存前缀？
什么该写成 schema？
什么该落盘？
什么该压缩成 receipt？
什么该直接停止？
```

这才是从 prompt 使用者，走向 Agent 系统设计者的关键一步。

## 16. 基于这套思考，我做了一个三件套

这篇文章不是只停在概念层。

我后面把这套 token、上下文、模型路由和复盘的思考，拆成了三个可以组合使用的 Codex skill / agent 工具：

```text
agent-cost-router
= 先判断怎么做最省、最安全
= 决定用哪个模型、读多少上下文、要不要探针、该触发哪个 skill
https://github.com/aDragon0707/agent-cost-router
```

```text
token-prompt-compiler
= 开工前把混乱需求变成可执行任务包
= 产出 Tiny Packet / Standard Packet / Worker Packet / Micro Receipt
https://github.com/aDragon0707/token-prompt-compiler
```

```text
audit-evolution
= 完成后做轻量复盘和续航
= 产出 Tiny Audit / Evidence Receipt / Clean-State Packet
目前是本地 skill，还没独立上传 GitHub
C:\Users\86181\.codex\skills\audit-evolution
```

最简单工作流：

```text
1. agent-cost-router
   先选路线：怎么省 token、用谁、读多少
   https://github.com/aDragon0707/agent-cost-router

2. token-prompt-compiler
   再编译任务：把需求变成最小任务包
   https://github.com/aDragon0707/token-prompt-compiler

3. audit-evolution
   最后收尾：记录证据、教训、下一步
   本地路径：C:\Users\86181\.codex\skills\audit-evolution
```

一句话：

```text
router 决定路线
compiler 编译任务
audit 保存经验
```

如果前面的部分是在解释“为什么会烧 token”，这组三件套就是我给自己的一个实践回答：

```text
先判断路线，再编译任务，最后保存经验。
```

