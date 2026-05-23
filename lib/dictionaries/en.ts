export const en = {
  nav: {
    logo: "ADRAGON",
    home: "Home",
    blog: "Tech Blog",
    thinking: "Thinking",
    projects: "Projects",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    lang_switch: "中文",
  },
  home: {
    hero: {
      eyebrow: "AI AGENT SYSTEM BUILDER",
      title: "I build AI agent systems for web evidence and solo-company work.",
      accent: "",
      intro_title:
        "ADRAGON is my personal technology portfolio: agent workflows, audit tools, and operating systems that turn messy work into inspectable products.",
      description:
        "The work sits between AI agents, public web data, developer tooling, and durable personal operating systems.",
      cta_primary: "View projects",
      cta_secondary: "Contact",
      github_href: "https://github.com/aDragon0707",
    },
    status: {
      label: "Metadata",
      title: "Builder metadata",
      now: "Now shipping",
      system: "Agent Flight Recorder + ShadowBuyer",
      pulse: "Live evidence",
      pulse_body:
        "Claims become artifacts, audits become proofs, and proofs become something a visitor can inspect.",
      quote: "Trust is built from receipts, not vibes.",
      items: [
        ["Role", "AI agent system builder"],
        ["Focus", "Web evidence, workflow reliability, solo-company systems"],
        ["Current work", "ShadowBuyer, Agent Flight Recorder, Solo AI Company OS"],
        ["Base", "Shanghai, remote-friendly"],
      ],
    },
    home_sections: {
      projects: {
        label: "Projects",
        title: "Systems I am building.",
        intro:
          "The projects show the shape of the work: audit agents, agent reliability tools, and a personal operating system for AI-assisted building.",
        view_all: "View all projects",
      },
      tech_blog: {
        label: "Tech Blog",
        title: "Engineering notes.",
        intro:
          "Short technical writing about agents, workflow reliability, public web data, and implementation decisions.",
        view_all: "Open tech blog",
        empty: "No technical posts yet.",
      },
      thinking: {
        label: "Personal Thinking",
        title: "Thinking in public.",
        intro:
          "Personal notes about learning, judgment, solo-company practice, and becoming a better operator.",
        view_all: "Open thinking archive",
        empty: "No thinking notes yet.",
      },
    },
    flow: {
      label: "Operating architecture",
      title: "Thinking becomes thesis, thesis becomes system, system becomes proof.",
      intro:
        "The site should feel composed, not busy. Each stage sharpens the next one until the work can stand in public with evidence attached.",
      items: [
        ["Observe", "Read the field, name the pressure, and isolate the real problem."],
        ["Write", "Turn the pressure into a thesis, note, or operating decision."],
        ["Build", "Ship a workflow, interface, protocol, or compact system."],
        ["Trace", "Keep screenshots, logs, PDFs, and review notes attached."],
        ["Deliver", "Package the proof into a pilot, demo, or public artifact."],
      ],
    },
    projects: {
      eyebrow: "Featured systems",
      title: "Three systems sit at the center of the brand.",
      description:
        "They define the public story: agent receipts, web evidence, and the operating system that keeps one person compounding with taste intact.",
      view_all: "Open system ledger",
      items: [
        {
          title: "ShadowBuyer Web Data Audit Agent",
          category: "Web evidence audit",
          status: "Public evidence system",
          problem:
            "Public pages contain price, inventory, policy, and fee signals, but buyers still need reviewable evidence.",
          thesis:
            "A small audit agent can turn messy public web data into evidence cards and a one-page report.",
          system:
            "Capture the page, extract fields, compare differences, preserve screenshots, and write claim boundaries.",
          next: "Package a tighter demo and a clearer paid pilot entry.",
          description:
            "A cash-flow oriented web-data agent that captures public pages, generates evidence cards, compares differences, and outputs a concise audit report.",
          tags: ["Bright Data", "Evidence cards", "Audit report"],
          primaryHref:
            "/assets/shadowbuyer/ShadowBuyer_Executive_Summary_EN_2026.pdf",
          primaryLabel: "Open summary",
          secondaryLinks: [
            {
              label: "Redacted audit sample",
              href: "/assets/shadowbuyer/ShadowBuyer_One_Page_Redacted_Audit_Sample.pdf",
            },
            {
              label: "Rate parity sample",
              href: "/assets/shadowbuyer/Sample_Audit_Report_Rate_Parity_Verification.pdf",
            },
          ],
          isPublic: true,
        },
        {
          title: "Agent Flight Recorder",
          category: "Agent receipt protocol",
          status: "Protocol build",
          problem:
            "Agents can confidently claim work is done while missing evidence, review, and responsibility boundaries.",
          thesis:
            "Agent output should leave a receipt: claim, evidence status, required fix, and review gate.",
          system:
            "SACP receipt schema, unsupported-claim detection, human review gates, and hash anchoring.",
          next: "Turn the protocol into a clearer demo and developer-facing README.",
          description:
            "A Mantle-facing AI DevTools project that turns agent claims, missing evidence, review gates, and fixes into structured work receipts.",
          tags: ["SACP", "AgentOps Doctor", "Mantle"],
          primaryHref: "https://github.com/aDragon0707/sacp",
          primaryLabel: "View protocol",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Solo AI Company OS",
          category: "Solo-company operating system",
          status: "Public GitHub",
          problem:
            "One person using many AI workers needs memory, decisions, handoffs, and worklogs that survive context drift.",
          thesis:
            "A Markdown operating system can make solo work more durable than a pile of chats.",
          system:
            "Founder decisions, AI employee handoffs, dashboards, worklogs, reusable skills, and audit receipts.",
          next: "Publish a cleaner public map and starter guide.",
          description:
            "A Markdown operating system for coordinating AI workers with founder decisions, durable worklogs, handoffs, dashboards, and reusable skills.",
          tags: ["Markdown", "AI workers", "Handoffs", "Memory"],
          primaryHref: "https://github.com/aDragon0707/Solo-AI-Company-OS",
          primaryLabel: "View GitHub",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Reading Reflection OS",
          category: "Learning operating system",
          status: "Private system",
          problem:
            "Reading often disappears into notes without becoming judgment or action.",
          thesis:
            "Reflection should become reusable memory, not just a feeling after reading.",
          system:
            "Structured reflection, reusable insight cards, and long-term founder learning loops.",
          next: "Convert private notes into a sanitized case preview.",
          description:
            "A knowledge system for turning reading into structured reflection, reusable insight, and long-term founder learning loops.",
          tags: ["Reflection", "Learning loops", "Knowledge base"],
          primaryHref: "#contact",
          primaryLabel: "Case notes",
          secondaryLinks: [],
          isPublic: false,
        },
        {
          title: "IELTS Assistant",
          category: "AI learning tool",
          status: "Live product",
          problem:
            "Language learning needs review loops, OCR-assisted material handling, and writing feedback.",
          thesis:
            "A small learning assistant can turn practice into reviewable cards and targeted coaching.",
          system:
            "Reading review, writing coaching, OCR-assisted material processing, and review-card learning.",
          next: "Connect the learning evidence back into the personal OS story.",
          description:
            "A live IELTS study assistant for reading review, writing coaching, OCR-assisted material processing, and review-card based learning.",
          tags: ["Web app", "OCR", "Writing coach"],
          primaryHref: "https://ielts.alantern.com",
          primaryLabel: "Open website",
          secondaryLinks: [],
          isPublic: true,
        },
        {
          title: "Socrates Focus",
          category: "Deep learning system",
          status: "Research system",
          problem:
            "Learning tools often produce answers without forcing better reasoning.",
          thesis:
            "A thinking coach should ground claims in source material and preserve useful learning traces.",
          system:
            "Evidence-constrained reasoning, source grounding, learning traces, and GraphRAG experiments.",
          next: "Prepare a public case note without exposing private research data.",
          description:
            "An evidence-constrained thinking coach that helps users reason better, ground claims in source material, and preserve useful learning traces.",
          tags: ["FastAPI", "React", "GraphRAG", "Evidence ledger"],
          primaryHref: "#contact",
          primaryLabel: "Case notes",
          secondaryLinks: [],
          isPublic: false,
        },
      ],
    },
    notes: {
      label: "Latest writing",
      title: "The thought spine behind the systems.",
      subtitle:
        "Tech posts and personal notes share one archive. The channel tells you whether a piece is engineering, founder reasoning, or reflection.",
      view_blog: "Tech blog",
      view_thinking: "Thinking archive",
      view_all: "All writing",
      empty: "No public notes yet.",
      admin_hint: "Draft new notes from the private writing desk.",
      admin_label: "Open writing desk",
    },
    proof: {
      label: "Governance",
      title: "Every claim should open onto an artifact.",
      intro:
        "The site never asks a visitor to trust a claim that cannot be checked.",
      items: [
        ["GitHub", "Protocols, operating systems, and public experiments."],
        ["PDF reports", "Executive summaries and redacted audit samples."],
        ["Receipts", "Claim boundaries, evidence gaps, and required fixes."],
        ["Demos", "Short walkthroughs that show the system moving."],
      ],
    },
    builder: {
      label: "About",
      title: "The operator is part of the system.",
      body:
        "I build at the edge between learning, product judgment, AI workflows, and proof. The long-term question is how one person can use AI without losing responsibility, taste, or memory.",
      second_title: "Productizing ambiguity.",
      second_body:
        "I turn messy work into flows, interfaces, evidence objects, review gates, and scoped pilots. The connective tissue is the product.",
    },
    offers: {
      label: "Pilot entry",
      title: "Start with one proof-producing pilot.",
      intro:
        "The goal is not a hard sales page. It is a low-friction way for serious visitors to test the working style.",
      items: [
        {
          title: "Web Data Audit Pilot",
          body:
            "Audit one product, hotel, or public-page set and deliver evidence cards plus a one-page diff report.",
          price: "$49 to $99",
        },
        {
          title: "AI Agent Workflow Audit",
          body:
            "Review an agent workflow, handoff, or output and identify evidence gaps, ownership issues, and review gates.",
          price: "$99 to $199",
        },
        {
          title: "Receipt Layer Prototype",
          body:
            "Design a minimal receipt schema, review flow, and hash anchoring path for an agent project.",
          price: "Scoped project",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Work with me or follow the systems.",
      body:
        "Reach me through GitHub or email. I am interested in AI agent reliability, web-data evidence, developer tooling, and solo-company systems.",
      github: "GitHub: aDragon0707",
      github_href: "https://github.com/aDragon0707",
      email_label: "Email: adragon@alantern.com",
      email_href: "mailto:adragon@alantern.com",
      public_url_label: "Public site",
      public_url: "https://adragons-portfolio.vercel.app/en",
      qr_label: "Scan to open this site",
      admin_label: "Open writing desk",
      footer: "Personal technology portfolio. Built with Next.js and Tailwind CSS.",
    },
  },
  archive: {
    all_path: "Archive",
    blog_path: "Tech Blog",
    thinking_path: "Thinking",
    all_title: "All writing",
    blog_title: "Technical blog",
    thinking_title: "Personal thinking",
    all_subtitle:
      "A shared archive for technical notes, build logs, and personal reflections.",
    blog_subtitle:
      "Engineering notes about AI agents, cost design, evidence objects, and workflow reliability.",
    thinking_subtitle:
      "Personal essays about learning, judgment, building, and becoming a more complete operator.",
    empty: "No public notes yet.",
    back: "Back to archive",
    featured: "Featured",
    channels: {
      tech: "Tech blog",
      thinking: "Thinking",
      build: "Build log",
    },
  },
  admin: {
    path: "Writing Desk",
    title: "New Note",
    subtitle:
      "Ctrl+Enter to save. Write in Chinese first, then the system can generate the English version.",
    label_title: "Title",
    label_content: "Content (Markdown)",
    placeholder_title: "Note: ...",
    placeholder_content: "## Context\n\n...",
    btn_save: "Save note",
    btn_saving: "saving...",
    btn_clear: "Clear",
    hint_prefix: "After saving, visit",
    hint_link: "/devlog",
    hint_suffix: "to see the new note",
    error_required: "Title and content are both required.",
    success_zh_prefix: "saved zh ->",
    success_en_prefix: "saved en ->",
    error_prefix: "error:",
  },
};

export type Dictionary = typeof en;
