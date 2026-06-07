import type { Dictionary } from "./en";

export const zh: Dictionary = {
  nav: {
    logo: "ADRAGON",
    home: "首页",
    blog: "技术博客",
    thinking: "思考",
    projects: "项目",
    about: "关于",
    contact: "联系",
    admin: "管理",
    lang_switch: "English",
  },
  home: {
    hero: {
      eyebrow: "AI AGENT 系统构建者",
      title: "我构建面向网页证据和一人公司的 AI Agent 系统。",
      accent: "",
      intro_title:
        "ADRAGON 是我的个人技术作品集：Agent 工作流、审计工具，以及把混乱工作整理成可检查产品的操作系统。",
      description:
        "我关注 AI Agent、公开网页数据、开发者工具，以及能长期复用的个人工作系统。",
      cta_primary: "查看项目",
      cta_secondary: "联系",
      github_href: "https://github.com/aDragon0707",
    },
    status: {
      label: "基本信息",
      title: "构建者信息",
      now: "正在交付",
      system: "Agent Flight Recorder + ShadowBuyer",
      pulse: "实时证据",
      pulse_body:
        "声明变成可检查的工件，审计变成证明，证明变成访客可以打开的对象。",
      quote: "信任来自回执，不来自感觉。",
      items: [
        ["角色", "AI Agent 系统构建者"],
        ["方向", "网页证据、工作流可靠性、一人公司系统"],
        ["当前项目", "ShadowBuyer、Agent Flight Recorder、Solo AI Company OS"],
        ["协作", "支持远程协作"],
      ],
    },
    home_sections: {
      projects: {
        label: "项目",
        title: "我正在构建的系统。",
        intro:
          "项目展示我的主要工作：审计 Agent、Agent 可靠性工具，以及用 AI 协助个人长期构建的操作系统。",
        view_all: "查看全部项目",
      },
      tech_blog: {
        label: "技术博客",
        title: "工程笔记。",
        intro:
          "记录 AI Agent、工作流可靠性、公开网页数据和实现取舍。",
        view_all: "打开技术博客",
        empty: "还没有技术文章。",
      },
      thinking: {
        label: "个人思考",
        title: "公开整理思考。",
        intro:
          "关于学习、判断、一人公司实践，以及如何成为更完整的操作者。",
        view_all: "打开思考归档",
        empty: "还没有思考笔记。",
      },
    },
    flow: {
      label: "操作架构",
      title: "观察变成主张，主张变成系统，系统变成证明。",
      intro:
        "这个站点应该显得克制、完整，而不是喧闹。每一步都在压实下一步，直到工作可以带着证据公开站立。",
      items: [
        ["Observe", "阅读场域，命名压力，提取真正的问题。"],
        ["Write", "把压力转成主张、笔记或操作决策。"],
        ["Build", "交付工作流、界面、协议或小型系统。"],
        ["Trace", "保留截图、日志、PDF 和评审记录。"],
        ["Deliver", "把证明打包成试点、演示或公开工件。"],
      ],
    },
    projects: {
      eyebrow: "精选系统",
      title: "三个系统构成品牌中心。",
      description:
        "它们定义公开叙事：Agent 回执、网页证据，以及让一个人持续复利且不丢失品味的操作系统。",
      view_all: "打开系统台账",
      groups: [
        {
          key: "cashflow",
          label: "现金流证据",
          caption:
            "最接近付费试点。把公开页面证据整理成买家可复查的一页审计。",
        },
        {
          key: "agent_trust",
          label: "Agent 信任证据",
          caption:
            "用回执、声明边界和复核门槛让 Agent 工作可被检查。",
        },
        {
          key: "os",
          label: "操作系统证据",
          caption:
            "一个人协调多个 AI worker 的长期结构。",
        },
        {
          key: "learning",
          label: "学习系统",
          caption:
            "操作者背后的复利循环：阅读、语言、推理。",
        },
      ] as const,
      spec_labels: {
        problem: "问题",
        thesis: "主张",
        system: "系统",
        next: "下一步",
      },
      items: [
        {
          title: "ShadowBuyer Web Data Audit Agent",
          role: "cashflow" as const,
          category: "网页证据审计",
          status: "公开证据系统",
          problem:
            "公开页面里有价格、库存、政策和费用信号，但买家仍需要可复查的证据。",
          thesis:
            "一个小型审计 Agent 可以把杂乱的网页数据转成 evidence cards 和一页报告。",
          system:
            "抓取页面、提取字段、对比差异、保留截图、写清声明边界。",
          next: "整理更紧凑的 demo 和更明确的付费试点入口。",
          description:
            "面向现金流的网页数据 Agent，抓取公开页面，生成 evidence cards，比较差异，并输出简洁审计报告。",
          tags: ["Bright Data", "Evidence cards", "Audit report"],
          primaryHref:
            "/assets/shadowbuyer/ShadowBuyer_Executive_Summary_EN_2026.pdf",
          primaryLabel: "打开摘要",
          secondaryLinks: [
            {
              label: "脱敏审计样例",
              href: "/assets/shadowbuyer/ShadowBuyer_One_Page_Redacted_Audit_Sample.pdf",
            },
            {
              label: "价格一致性样例",
              href: "/assets/shadowbuyer/Sample_Audit_Report_Rate_Parity_Verification.pdf",
            },
          ],
          isPublic: true,
        },
        {
          title: "Agent Flight Recorder",
          role: "agent_trust" as const,
          category: "Agent 回执协议",
          status: "协议构建中",
          problem:
            "Agent 可能自信地宣称任务完成，却缺少证据、复核和责任边界。",
          thesis:
            "Agent 输出应该留下回执：主张、证据状态、需要修复的内容和复核门槛。",
          system:
            "SACP 回执 schema、未支持主张检测、人工复核门槛和 hash 锚定。",
          next: "把协议整理成更清晰的 demo 和开发者 README。",
          description:
            "面向 Mantle 的 AI DevTools 项目，把 Agent 主张、证据缺口、复核门槛和修复建议转成结构化工作回执。",
          tags: ["SACP", "AgentOps Doctor", "Mantle"],
          primaryHref: "https://github.com/aDragon0707/sacp",
          primaryLabel: "查看协议",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Solo AI Company OS",
          role: "os" as const,
          category: "一人公司操作系统",
          status: "公开 GitHub",
          problem:
            "一个人同时使用很多 AI worker，需要能抵抗上下文漂移的记忆、决策、交接和工作日志。",
          thesis:
            "Markdown 操作系统可以让一人公司的工作比一堆聊天记录更耐久。",
          system:
            "创始人决策、AI 员工交接、仪表盘、工作日志、可复用技能和审计回执。",
          next: "发布更清晰的公开地图和入门指南。",
          description:
            "用 Markdown 协调 AI 员工的操作系统，包含创始人决策、持久工作日志、交接、仪表盘和可复用技能。",
          tags: ["Markdown", "AI workers", "Handoffs", "Memory"],
          primaryHref: "https://github.com/aDragon0707/Solo-AI-Company-OS",
          primaryLabel: "查看 GitHub",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Reading Reflection OS",
          role: "learning" as const,
          category: "学习操作系统",
          status: "私有系统",
          problem:
            "阅读常常消失在笔记里，没有变成判断或行动。",
          thesis:
            "反思应该变成可复用的记忆，而不只是读完之后的一点感觉。",
          system:
            "结构化复盘、可复用洞察卡片和长期创始人学习循环。",
          next: "把私有笔记整理成脱敏案例预览。",
          description:
            "把阅读转成结构化反思、可复用洞察和长期学习循环的知识系统。",
          tags: ["Reflection", "Learning loops", "Knowledge base"],
          primaryHref: "#contact",
          primaryLabel: "案例笔记",
          secondaryLinks: [],
          isPublic: false,
        },
        {
          title: "IELTS Assistant",
          role: "learning" as const,
          category: "AI 学习工具",
          status: "线上产品",
          problem:
            "语言学习需要复盘循环、OCR 辅助处理材料，以及写作反馈。",
          thesis:
            "小型学习助手可以把练习变成可复查卡片和有针对性的教练反馈。",
          system:
            "阅读复盘、写作教练、OCR 材料处理和复习卡片学习。",
          next: "把学习证据重新接回个人 OS 的公开叙事。",
          description:
            "一个线上 IELTS 学习助手，支持阅读复盘、写作教练、OCR 材料处理和复习卡片式学习。",
          tags: ["Web app", "OCR", "Writing coach"],
          primaryHref: "https://ielts.alantern.com",
          primaryLabel: "打开网站",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Socrates Focus",
          role: "learning" as const,
          category: "深度学习系统",
          status: "研究系统",
          problem:
            "很多学习工具只给答案，却没有推动更好的推理。",
          thesis:
            "思考教练应该把主张锚定到来源材料，同时保留有用的学习痕迹。",
          system:
            "证据约束推理、来源 grounding、学习痕迹和 GraphRAG 实验。",
          next: "准备不暴露私有研究数据的公开案例笔记。",
          description:
            "证据约束型思考教练，帮助用户更好地推理，把观点绑定到来源材料，并保留有用的学习痕迹。",
          tags: ["FastAPI", "React", "GraphRAG", "Evidence ledger"],
          primaryHref: "#contact",
          primaryLabel: "案例预览",
          secondaryLinks: [],
          isPublic: false,
        },
      ],
    },
    notes: {
      label: "最新写作",
      title: "支撑这些系统的思考脊柱。",
      subtitle:
        "技术文章和个人笔记共享同一个归档。频道会告诉你这是一篇工程记录、创始人思考，还是反思。",
      view_blog: "技术博客",
      view_thinking: "思考归档",
      view_all: "全部写作",
      empty: "还没有公开文章。",
      admin_hint: "可以从私有写作台发布新笔记。",
      admin_label: "打开写作台",
    },
    proof: {
      label: "治理",
      title: "每个主张都应该能打开对应工件。",
      intro:
        "这个站点不会要求访客相信一个无法检查的声明。",
      items: [
        ["GitHub", "协议、操作系统和公开实验。"],
        ["PDF 报告", "执行摘要和脱敏审计样例。"],
        ["Receipts", "声明边界、证据缺口和必要修复。"],
        ["Demos", "展示系统移动起来的短演示。"],
      ],
    },
    builder: {
      label: "关于",
      title: "操作者本身也是系统的一部分。",
      body:
        "我在学习、产品判断、AI 工作流和证据之间的边界上构建东西。长期问题是，一个人如何使用 AI，而不丢失责任、品味和记忆。",
      second_title: "把模糊问题产品化。",
      second_body:
        "我把混乱工作拆成流程、界面、证据对象、复核门槛和有范围的试点。真正连接它们的，是产品本身。",
    },
    offers: {
      label: "试点入口",
      title: "从一个能产出证据的小试点开始。",
      intro:
        "这里不是强销售页，而是一个让认真访客低摩擦测试工作方式的入口。",
      items: [
        {
          title: "Web Data Audit Pilot",
          body:
            "审计一个产品、酒店或公开页面集合，交付 evidence cards 和一页差异报告。",
          price: "$49 to $99",
        },
        {
          title: "AI Agent Workflow Audit",
          body:
            "检查一个 Agent 工作流、交接或输出，找出证据缺口、责任边界和复核门槛。",
          price: "$99 to $199",
        },
        {
          title: "Receipt Layer Prototype",
          body:
            "为某个 Agent 项目设计最小回执 schema、复核流程和链上 hash 锚定方案。",
          price: "定制项目",
        },
      ],
    },
    contact: {
      label: "联系",
      title: "联系我，或继续看这些系统。",
      body:
        "可以通过 GitHub 或邮箱联系我。我关注 AI Agent 可靠性、网页数据证据、开发者工具和一人公司系统。",
      github: "GitHub: aDragon0707",
      github_href: "https://github.com/aDragon0707",
      email_label: "Email: adragon@alantern.com",
      email_href: "mailto:adragon@alantern.com",
      public_url_label: "公开站点",
      public_url: "https://adragons-portfolio.vercel.app/zh",
      qr_label: "扫码打开本站",
      admin_label: "打开写作台",
      footer: "个人技术作品集，使用 Next.js 和 Tailwind CSS 构建。",
    },
  },
  archive: {
    all_path: "归档",
    blog_path: "技术博客",
    thinking_path: "思考",
    all_title: "全部写作",
    blog_title: "技术博客",
    thinking_title: "个人思考",
    all_subtitle:
      "技术笔记、构建记录和个人反思共享同一个长期文章库。",
    blog_subtitle:
      "关于 AI Agent、成本设计、证据对象和工作流可靠性的工程笔记。",
    thinking_subtitle:
      "关于学习、判断、构建，以及成为更完整操作者的个人文章。",
    empty: "还没有公开文章。",
    back: "返回归档",
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
    subtitle: "按 Ctrl+Enter 保存。先写中文，系统可以生成英文版本。",
    label_title: "标题",
    label_content: "内容（Markdown）",
    placeholder_title: "笔记：...",
    placeholder_content: "## 背景\n\n...",
    btn_save: "保存文章",
    btn_saving: "保存中...",
    btn_clear: "清空",
    hint_prefix: "保存后访问",
    hint_link: "/devlog",
    hint_suffix: "即可看到新文章",
    error_required: "标题和内容都不能为空。",
    success_zh_prefix: "已保存 zh ->",
    success_en_prefix: "已保存 en ->",
    error_prefix: "错误：",
  },
};
