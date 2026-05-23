import type { Dictionary } from "./en";

export const zh: Dictionary = {
  nav: {
    logo: "ADRAGON",
    home: "首页",
    blog: "技术博客",
    thinking: "思考",
    projects: "项目实验室",
    about: "关于",
    contact: "联系",
    admin: "管理",
    lang_switch: "English",
  },
  home: {
    hero: {
      eyebrow: "流动的个人实验室",
      title: "一个关于 Agent 信任、证据和一人公司系统的流动实验室。",
      intro_title:
        "思考变成文章，文章变成项目，项目变成证据，证据带来下一次机会。",
      description:
        "ADRAGON 是一个双语个人技术站：记录 AI Agent 回执、网页数据证据、学习系统，以及一人 AI 公司的长期操作循环。",
      cta_primary: "阅读当前主线",
      cta_secondary: "进入项目实验室",
      github_href: "https://github.com/aDragon0707",
    },
    status: {
      label: "当前流动",
      now: "正在构建",
      system: "Agent Flight Recorder + ShadowBuyer 证据层",
      pulse: "最新脉搏",
      pulse_body:
        "把声明、截图、报告和人工复核变成访客可以打开检查的证据对象。",
      quote: "稀缺的不是另一个答案框，而是可负责的执行。",
    },
    flow: {
      label: "操作循环",
      title: "一条连续的线：思考，项目，证据，机会。",
      intro:
        "这个网站要有生命力，因为工作本身在持续流动。每篇文章可以变成 demo，每个 demo 可以变成回执，每个回执可以变成信任。",
      items: [
        ["Thinking", "阅读、观察，把模糊压力命名出来。"],
        ["Writing", "把问题发布成文章、主线判断或构建记录。"],
        ["Project", "交付一个 workflow、demo、报告或 receipt。"],
        ["Proof", "绑定 GitHub、PDF、截图、日志和复核门槛。"],
        ["Cash / Token", "用 pilot、grant 和客户工作支持下一轮循环。"],
      ],
    },
    projects: {
      eyebrow: "主线项目",
      title: "项目不是作品格子，而是证据对象。",
      description:
        "前三个项目承载公开叙事：网页数据证据、Agent 回执，以及让一个人持续复利的操作系统。",
      view_all: "打开项目实验室",
      items: [
        {
          title: "ShadowBuyer Web Data Audit Agent",
          category: "实时网页数据审计",
          status: "优先商业化",
          problem:
            "公开网页里有价格、库存、政策和费用信号，但买家仍然缺少可复核的证据。",
          thesis:
            "一个小型审计 Agent 可以把混乱的公开网页数据变成 evidence cards 和一页报告。",
          system:
            "抓取页面、提取字段、对比差异、保存截图、写清 claim boundary。",
          next: "打包 90 秒 demo，并把付费试点入口写得更清楚。",
          description:
            "面向现金流的网页数据 Agent：抓取公开页面，生成 evidence cards，对比价格、库存、费用或条款差异，并输出审计报告。",
          tags: ["Bright Data", "Evidence Cards", "Audit Report"],
          primaryHref:
            "/assets/shadowbuyer/ShadowBuyer_Executive_Summary_2026.pdf",
          primaryLabel: "打开中文摘要",
          secondaryLinks: [
            {
              label: "英文 summary",
              href: "/assets/shadowbuyer/ShadowBuyer_Executive_Summary_EN_2026.pdf",
            },
            {
              label: "脱敏审计样例",
              href: "/assets/shadowbuyer/ShadowBuyer_One_Page_Redacted_Audit_Sample.pdf",
            },
            {
              label: "Rate parity 样例",
              href: "/assets/shadowbuyer/Sample_Audit_Report_Rate_Parity_Verification.pdf",
            },
          ],
          isPublic: true,
        },
        {
          title: "Agent Flight Recorder",
          category: "AI Agent 回执层",
          status: "黑客松主线",
          problem:
            "Agent 可能自信地说工作完成了，但缺少证据、复核和责任边界。",
          thesis:
            "Agent 输出应该留下回执：声明、证据状态、必需修复和复核门槛。",
          system:
            "SACP receipt schema、unsupported claim 检测、人工复核门槛和哈希锚定。",
          next: "把协议整理成更清楚的 demo 和开发者 README。",
          description:
            "一个面向 Mantle 的 AI DevTools 项目，把 Agent 声明、证据缺口、复核门槛和修复建议变成结构化工作回执。",
          tags: ["SACP", "AgentOps Doctor", "Mantle"],
          primaryHref: "https://github.com/aDragon0707/sacp",
          primaryLabel: "查看协议",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Solo AI Company OS",
          category: "一人公司操作系统",
          status: "公开 GitHub",
          problem:
            "一个人同时使用很多 AI worker，需要能抵抗上下文漂移的记忆、决策、交接和工作日志。",
          thesis:
            "Markdown 操作系统可以让一人公司比一堆聊天记录更耐久。",
          system:
            "创始人决策、AI 员工交接、仪表盘、worklog、可复用技能和审计回执。",
          next: "发布更清晰的公开地图和 starter guide。",
          description:
            "用 Markdown 协调 AI 员工、创始人决策、长期 worklog、handoff、dashboard 和技能库的母系统。",
          tags: ["Markdown", "AI 员工", "Handoff", "Memory"],
          primaryHref: "https://github.com/aDragon0707/Solo-AI-Company-OS",
          primaryLabel: "查看 GitHub",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Reading Reflection OS",
          category: "学习操作系统",
          status: "实验室资产",
          problem:
            "阅读经常消失在笔记里，没有变成判断和下一次行动。",
          thesis:
            "反思应该成为可复用记忆，而不是读完之后的一点感觉。",
          system:
            "结构化复盘、洞察卡片和长期创始人学习循环。",
          next: "把私人笔记转化成脱敏案例预览。",
          description:
            "把阅读输入转化成结构化反思、可复用洞察和长期学习循环的知识系统。",
          tags: ["阅读复盘", "学习循环", "知识库"],
          primaryHref: "#contact",
          primaryLabel: "案例预览",
          secondaryLinks: [],
          isPublic: false,
        },
        {
          title: "IELTS Assistant",
          category: "AI 学习工具",
          status: "已上线网站",
          problem:
            "语言学习需要复盘循环、OCR 材料处理和写作反馈。",
          thesis:
            "小型学习助手可以把练习变成可复盘的卡片和有针对性的教练反馈。",
          system:
            "阅读复盘、写作教练、OCR 材料处理和复习卡片。",
          next: "把学习证据重新接回个人 OS 的公开叙事。",
          description:
            "已上线的雅思学习助手，支持阅读复盘、写作教学、OCR 材料处理和复习卡片沉淀。",
          tags: ["Web 应用", "OCR", "写作教练"],
          primaryHref: "https://ielts.alantern.com",
          primaryLabel: "打开网站",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Socrates Focus",
          category: "深度学习系统",
          status: "实验室资产",
          problem:
            "很多学习工具只给答案，却没有逼人更好地推理。",
          thesis:
            "思考教练应该把观点绑定到来源材料，并保留有用的学习轨迹。",
          system:
            "证据约束推理、source grounding、学习轨迹和 GraphRAG 实验。",
          next: "准备不暴露私人研究数据的公开案例笔记。",
          description:
            "证据约束型思考教练，帮助用户更好地推理，把观点绑定到来源材料，并保存有用的学习轨迹。",
          tags: ["FastAPI", "React", "GraphRAG", "Evidence ledger"],
          primaryHref: "#contact",
          primaryLabel: "案例预览",
          secondaryLinks: [],
          isPublic: false,
        },
      ],
    },
    notes: {
      label: "最新文章",
      title: "项目背后的 thought spine。",
      subtitle:
        "技术博客和个人思考共享一个文章库。频道会告诉你这篇更偏工程、构建记录，还是学习与判断。",
      view_blog: "技术博客",
      view_thinking: "思考归档",
      view_all: "全部文章",
      empty: "还没有公开文章。",
      admin_hint: "新的文章可以从私人的写作台发布。",
      admin_label: "打开写作台",
    },
    proof: {
      label: "证据架",
      title: "信任从可以打开的对象开始。",
      intro:
        "这个网站不应该要求别人相信没有证据的声明。每个关键判断都要尽量对应一个 artifact。",
      items: [
        ["GitHub", "协议、操作系统和公开实验。"],
        ["PDF 报告", "执行摘要和脱敏审计样例。"],
        ["Receipts", "声明边界、证据缺口和 required fix。"],
        ["Demos", "能看见系统流动的短视频或 walkthrough。"],
      ],
    },
    builder: {
      label: "关于",
      title: "构建者也是系统的一部分。",
      body:
        "我正在学习、产品判断、AI 工作流和证据之间的边界上构建。长期问题是：一个人如何使用 AI，同时不丢掉责任、品味和记忆。",
      second_title: "核心能力：把模糊问题产品化。",
      second_body:
        "我把混乱的工作拆成流程、界面、证据对象、复核门槛和清晰的小试点。真正的产品，是这些东西之间的连接。",
    },
    offers: {
      label: "合作入口",
      title: "先从一个能产出证据的小试点开始。",
      intro:
        "这里不是硬销售页面，而是给认真访客一个低摩擦方式，测试我的工作方式。",
      items: [
        {
          title: "Web Data Audit Pilot",
          body:
            "审计一个酒店、商品或公开网页集合，交付 evidence cards 和一页差异报告。",
          price: "$49 to $99",
        },
        {
          title: "AI Agent Workflow Audit",
          body:
            "检查一段 Agent 工作流、handoff 或输出，指出证据缺口、责任边界和复核门槛。",
          price: "$99 to $199",
        },
        {
          title: "Receipt Layer Prototype",
          body:
            "为一个 Agent 项目设计最小 receipt schema、审计流程和链上哈希锚定方案。",
          price: "Scoped project",
        },
      ],
    },
    contact: {
      title: "联系",
      body:
        "你可以通过 GitHub 或邮箱联系我。我尤其关注 AI Agent 可信执行、网页数据证据、开发者工具和一人公司系统。",
      github: "GitHub: aDragon0707",
      github_href: "https://github.com/aDragon0707",
      email_label: "Email: adragon@alantern.com",
      email_href: "mailto:adragon@alantern.com",
      public_url_label: "公开网站",
      public_url: "https://adragons-portfolio.vercel.app/zh",
      qr_label: "扫码打开这个网站",
      footer: "个人技术作品集。使用 Next.js 和 Tailwind CSS 构建。",
    },
  },
  archive: {
    all_path: "文章",
    blog_path: "技术博客",
    thinking_path: "思考",
    all_title: "全部文章",
    blog_title: "技术博客",
    thinking_title: "个人思考",
    all_subtitle:
      "技术笔记、构建记录和个人反思共享一个长期文章库。",
    blog_subtitle:
      "关于 AI Agent、成本设计、证据对象和工作流可靠性的工程笔记。",
    thinking_subtitle:
      "关于学习、判断、构建和成为更完整操作者的个人文章。",
    empty: "还没有公开文章。",
    back: "返回文章列表",
    featured: "精选",
    channels: {
      tech: "技术博客",
      thinking: "思考",
      build: "构建记录",
    },
  },
  admin: {
    path: "写作台",
    title: "新建文章",
    subtitle: "Ctrl+Enter 保存。可以先写中文，再生成英文版本。",
    label_title: "标题",
    label_content: "内容（Markdown）",
    placeholder_title: "文章：...",
    placeholder_content: "## 背景\n\n...",
    btn_save: "保存文章",
    btn_saving: "保存中...",
    btn_clear: "清空",
    hint_prefix: "保存后，访问",
    hint_link: "/devlog",
    hint_suffix: "查看新文章",
    error_required: "标题和内容都是必填项。",
    success_zh_prefix: "已保存 zh ->",
    success_en_prefix: "已保存 en ->",
    error_prefix: "错误：",
  },
};
