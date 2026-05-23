export const en = {
  nav: {
    logo: "ADRAGON",
    home: "Home",
    blog: "Tech Blog",
    thinking: "Thinking",
    projects: "Lab",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    lang_switch: "中文",
  },
  home: {
    hero: {
      eyebrow: "Living personal lab",
      title: "A flowing lab for agent trust, proof, and solo-company systems.",
      intro_title:
        "Thinking becomes writing. Writing becomes builds. Builds become proof. Proof creates the next chance.",
      description:
        "ADRAGON is a bilingual technology home for AI agent receipts, live web-data evidence, learning systems, and the operating loop behind a solo AI company.",
      cta_primary: "Read the current thesis",
      cta_secondary: "Explore the lab",
      github_href: "https://github.com/aDragon0707",
    },
    status: {
      label: "Current flow",
      now: "Now building",
      system: "Agent Flight Recorder + ShadowBuyer evidence layer",
      pulse: "Latest pulse",
      pulse_body:
        "Turning claims, screenshots, reports, and human review into proof objects a visitor can inspect.",
      quote: "The scarce layer is not another answer. It is accountable execution.",
    },
    flow: {
      label: "Operating loop",
      title: "One continuous line: thinking, project, proof, opportunity.",
      intro:
        "The site should feel alive because the work is alive. Each note can become a demo, each demo can become a receipt, each receipt can become trust.",
      items: [
        ["Thinking", "Read, observe, and name the pressure."],
        ["Writing", "Publish the question as a note or thesis."],
        ["Project", "Ship a workflow, demo, report, or receipt."],
        ["Proof", "Attach GitHub, PDFs, screenshots, logs, and review gates."],
        ["Cash / Token", "Use pilots, grants, and client work to fund the next loop."],
      ],
    },
    projects: {
      eyebrow: "Featured builds",
      title: "Projects are proof objects, not portfolio tiles.",
      description:
        "The first three builds carry the public story: live web evidence, agent receipts, and the operating system that keeps one person compounding.",
      view_all: "Open project lab",
      items: [
        {
          title: "ShadowBuyer Web Data Audit Agent",
          category: "Live web-data audit",
          status: "Priority build",
          problem:
            "Public pages contain price, inventory, policy, and fee signals, but buyers still need reviewable evidence.",
          thesis:
            "A small audit agent can turn messy public web data into evidence cards and a one-page report.",
          system:
            "Capture page, extract fields, compare differences, preserve screenshots, write claim boundaries.",
          next: "Package a 90-second demo and a clearer paid pilot entry.",
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
          category: "Agent receipt layer",
          status: "Hackathon build",
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
          status: "Lab system",
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
          status: "Live website",
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
          status: "Lab system",
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
      label: "Latest notes",
      title: "The thought spine behind the builds.",
      subtitle:
        "Technical notes and personal essays share one archive. The channel tells you whether the piece is engineering, founder thinking, or learning reflection.",
      view_blog: "Tech blog",
      view_thinking: "Thinking archive",
      view_all: "All notes",
      empty: "No public notes yet.",
      admin_hint: "Draft new notes from the private writing desk.",
      admin_label: "Open writing desk",
    },
    proof: {
      label: "Proof shelf",
      title: "Trust starts with objects a visitor can open.",
      intro:
        "The site should never ask people to believe a claim with no artifact behind it.",
      items: [
        ["GitHub", "Protocols, operating systems, and public experiments."],
        ["PDF reports", "Executive summaries and redacted audit samples."],
        ["Receipts", "Claim boundaries, missing evidence, and required fixes."],
        ["Demos", "Short videos or walkthroughs that show the system moving."],
      ],
    },
    builder: {
      label: "About",
      title: "The builder is part of the system.",
      body:
        "I am building from the edge between learning, product judgment, AI workflows, and proof. The long-term question is how one person can use AI without losing responsibility, taste, and memory.",
      second_title: "The edge is productizing ambiguity.",
      second_body:
        "I turn messy work into flows, interfaces, evidence objects, review gates, and scoped pilots. The connective tissue is the product.",
    },
    offers: {
      label: "Pilot entry",
      title: "Start with one small proof-producing pilot.",
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
      title: "Contact",
      body:
        "Reach me through GitHub or email. I am especially interested in AI agent reliability, web-data evidence, developer tooling, and solo-company systems.",
      github: "GitHub: aDragon0707",
      github_href: "https://github.com/aDragon0707",
      email_label: "Email: adragon@alantern.com",
      email_href: "mailto:adragon@alantern.com",
      public_url_label: "Public site",
      public_url: "https://adragons-portfolio.vercel.app/en",
      qr_label: "Scan to open this site",
      footer: "Personal technology portfolio. Built with Next.js and Tailwind CSS.",
    },
  },
  archive: {
    all_path: "Notes",
    blog_path: "Tech Blog",
    thinking_path: "Thinking",
    all_title: "All notes",
    blog_title: "Technical blog",
    thinking_title: "Personal thinking",
    all_subtitle:
      "A shared archive for technical notes, build logs, and personal reflections.",
    blog_subtitle:
      "Engineering notes about AI agents, cost design, evidence objects, and workflow reliability.",
    thinking_subtitle:
      "Personal essays about learning, judgment, building, and becoming a more complete operator.",
    empty: "No public notes yet.",
    back: "Back to notes",
    featured: "Featured",
    channels: {
      tech: "Tech Blog",
      thinking: "Thinking",
      build: "Build Log",
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
