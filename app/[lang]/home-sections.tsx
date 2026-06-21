import type { Locale, getDictionary } from "@/lib/dictionaries";
import type { PostMeta } from "@/lib/posts";
import type { ReactNode } from "react";

type HomeDict = ReturnType<typeof getDictionary>["home"];
type Project = HomeDict["projects"]["items"][number];

export function HomeView({
  lang,
  dict,
  canManageNotes,
  posts,
}: {
  lang: Locale;
  dict: HomeDict;
  canManageNotes: boolean;
  posts: PostMeta[];
}) {
  const isZh = lang === "zh";
  const resolveHref = (href: string) =>
    href.startsWith("#") ? `/${lang}${href}` : href;
  const techPosts = posts.filter((post) => post.channel === "tech").slice(0, 3);
  const thinkingPosts = posts
    .filter((post) => post.channel === "thinking" || post.channel === "build")
    .slice(0, 3);

  return (
    <main className={`site-shell brand-home ${isZh ? "cjk-safe" : ""}`}>
      <section id="hero" className="brand-hero section-frame">
        <div className="content-wrap brand-hero-grid">
          <div className="brand-hero-copy">
            <p className="brand-eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="brand-hero-title">{dict.hero.title}</h1>
            <p className="brand-hero-subtitle">{dict.hero.intro_title}</p>
            <p className="brand-copy">{dict.hero.description}</p>
            <div className="brand-actions">
              <a className="button-link primary-action" href={`/${lang}/projects`}>
                {dict.hero.cta_primary}
              </a>
              <a className="button-link" href="#contact">
                {dict.hero.cta_secondary}
              </a>
            </div>
          </div>

          <MetadataPanel dict={dict} />
        </div>
      </section>

      <section id="projects" className="section-frame">
        <div className="content-wrap brand-section-grid">
          <p className="brand-label">{dict.home_sections.projects.label}</p>
          <div>
            <h2 className="brand-section-title">
              {dict.home_sections.projects.title}
            </h2>
            <p className="brand-copy brand-section-intro">
              {dict.home_sections.projects.intro}
            </p>

            <div className="proof-preview-list">
              {(["cashflow", "agent_trust", "os"] as const).map((roleKey) => {
                const group = dict.projects.groups.find((g) => g.key === roleKey);
                const project = dict.projects.items.find((p) => p.role === roleKey);
                if (!group || !project) return null;
                return (
                  <div key={roleKey} className="proof-preview-row">
                    <p className="proof-preview-kicker">{group.label}</p>
                    <ProjectCard
                      project={project}
                      href={resolveHref(project.primaryHref)}
                      priority={roleKey === "cashflow"}
                    />
                  </div>
                );
              })}

              {(() => {
                const learning = dict.projects.groups.find((g) => g.key === "learning");
                const learningItems = dict.projects.items.filter((p) => p.role === "learning");
                if (!learning || learningItems.length === 0) return null;
                return (
                  <div className="proof-preview-row learning-summary">
                    <p className="proof-preview-kicker">{learning.label}</p>
                    <p className="brand-copy learning-summary-caption">{learning.caption}</p>
                    <ul className="learning-summary-list">
                      {learningItems.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <span>{item.category}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>

            <a className="quiet-link brand-more-link" href={`/${lang}/projects`}>
              {dict.home_sections.projects.view_all} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <WritingSection
        id="tech-blog"
        lang={lang}
        label={dict.home_sections.tech_blog.label}
        title={dict.home_sections.tech_blog.title}
        intro={dict.home_sections.tech_blog.intro}
        posts={techPosts}
        empty={dict.home_sections.tech_blog.empty}
        viewHref={`/${lang}/blog`}
        viewLabel={dict.home_sections.tech_blog.view_all}
      />

      <WritingSection
        id="thinking"
        lang={lang}
        label={dict.home_sections.thinking.label}
        title={dict.home_sections.thinking.title}
        intro={dict.home_sections.thinking.intro}
        posts={thinkingPosts}
        empty={dict.home_sections.thinking.empty}
        viewHref={`/${lang}/thinking`}
        viewLabel={dict.home_sections.thinking.view_all}
      />

      <footer id="contact" className="section-frame">
        <div className="content-wrap brand-footer">
          <div>
            <p className="brand-label">{dict.contact.label}</p>
            <h2 className="brand-section-title">{dict.contact.title}</h2>
            <p className="brand-footer-copy">{dict.contact.body}</p>
            <div className="brand-footer-links">
              <a
                className="quiet-link"
                href={dict.contact.github_href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.contact.github}
              </a>
              <a className="quiet-link" href={dict.contact.email_href}>
                {dict.contact.email_label}
              </a>
              <a
                className="quiet-link"
                href={dict.contact.public_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.contact.public_url_label}
              </a>
              {canManageNotes && (
                <a className="quiet-link" href={`/${lang}/admin`}>
                  {dict.contact.admin_label}
                </a>
              )}
            </div>
          </div>

          <a
            className="qr-card no-underline"
            href={dict.contact.public_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/portfolio-qr.svg" alt={dict.contact.qr_label} />
            <span>
              <span className="block text-sm font-semibold text-[color:var(--ink)]">
                {dict.contact.qr_label}
              </span>
              <span className="mt-2 block text-xs leading-5 text-[color:var(--muted)]">
                {dict.contact.public_url}
              </span>
            </span>
          </a>
        </div>
      </footer>
    </main>
  );
}

function WritingSection({
  id,
  lang,
  label,
  title,
  intro,
  posts,
  empty,
  viewHref,
  viewLabel,
}: {
  id: string;
  lang: Locale;
  label: string;
  title: string;
  intro: string;
  posts: PostMeta[];
  empty: string;
  viewHref: string;
  viewLabel: string;
}) {
  return (
    <Section id={id} label={label} title={title} intro={intro}>
      <div className="note-index">
        {posts.length === 0 ? (
          <p className="brand-copy">{empty}</p>
        ) : (
          posts.map((post) => (
            <a
              className="note-card"
              href={`/${lang}/devlog/${post.slug}`}
              key={post.slug}
            >
              <span>{post.date}</span>
              <strong>{post.title}</strong>
              {post.summary && <p>{post.summary}</p>}
            </a>
          ))
        )}
      </div>
      <div className="brand-note-links">
        <a className="quiet-link" href={viewHref}>
          {viewLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  );
}

function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-frame">
      <div className="content-wrap brand-section-grid">
        <p className="brand-label">{label}</p>
        <div>
          <h2 className="brand-section-title">{title}</h2>
          {intro && <p className="brand-copy brand-section-intro">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

function MetadataPanel({ dict }: { dict: HomeDict }) {
  return (
    <aside className="builder-strip" aria-label={dict.status.label}>
      <p className="brand-label">{dict.status.label}</p>
      <dl className="builder-strip-list">
        {dict.status.items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function ProjectCard({
  project,
  href,
  priority,
}: {
  project: Project;
  href: string;
  priority: boolean;
}) {
  const isExternal = !project.primaryHref.startsWith("#");

  return (
    <article className={`project-proof ${priority ? "is-priority" : ""}`}>
      <div>
        <div className="project-proof-meta">
          <span data-tone={project.isPublic ? "public" : "preview"}>
            {project.status}
          </span>
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="lab-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="project-proof-links">
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="quiet-link"
        >
          {project.primaryLabel} <span aria-hidden="true">→</span>
        </a>
        {project.secondaryLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="evidence-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
