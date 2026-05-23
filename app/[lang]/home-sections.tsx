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

  return (
    <main className={`site-shell brand-home ${isZh ? "cjk-safe" : ""}`}>
      <section id="hero" className="brand-hero section-frame">
        <div className="content-wrap brand-hero-grid">
          <div className="brand-hero-copy">
            <p className="brand-eyebrow">{dict.hero.eyebrow}</p>
            {isZh ? (
              <h1 className="brand-hero-title hero-title-zh">
                <span>把技术、思考与作品</span>
                <span>
                  接进证据链。<em>{dict.hero.accent}</em>
                </span>
              </h1>
            ) : (
              <h1 className="brand-hero-title">
                <span>{dict.hero.title}</span>
                <em>{dict.hero.accent}</em>
              </h1>
            )}
            <p className="brand-hero-subtitle">{dict.hero.intro_title}</p>
            <p className="brand-copy">{dict.hero.description}</p>
            <div className="brand-actions">
              <a className="button-link primary-action" href={`/${lang}/thinking`}>
                {dict.hero.cta_primary}
              </a>
              <a className="button-link" href={`/${lang}/projects`}>
                {dict.hero.cta_secondary}
              </a>
            </div>
            <div className="hero-micro-nav" aria-label="ADRAGON signals">
              <span>Open source</span>
              <span>Receipts</span>
              <span>Evidence</span>
              <span>Solo OS</span>
            </div>
          </div>

          <StatusPanel dict={dict} />
        </div>
      </section>

      <Section
        id="flow"
        label={dict.flow.label}
        title={dict.flow.title}
        intro={dict.flow.intro}
      >
        <div className="signal-strip" aria-label={dict.flow.label}>
          {dict.flow.items.map(([title, body], index) => (
            <article className="signal-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <section id="projects" className="section-frame">
        <div className="content-wrap brand-section-grid">
          <p className="brand-label">{dict.projects.eyebrow}</p>
          <div>
            <h2 className="brand-section-title">{dict.projects.title}</h2>
            <p className="brand-copy brand-section-intro">
              {dict.projects.description}
            </p>

            <div className="project-ledger">
              {dict.projects.items.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  href={resolveHref(project.primaryHref)}
                  priority={index === 0}
                />
              ))}
            </div>

            <a className="quiet-link brand-more-link" href={`/${lang}/projects`}>
              {dict.projects.view_all} -&gt;
            </a>
          </div>
        </div>
      </section>

      <Section
        id="notes"
        label={dict.notes.label}
        title={dict.notes.title}
        intro={dict.notes.subtitle}
      >
        <div className="note-index">
          {posts.length === 0 ? (
            <p className="brand-copy">{dict.notes.empty}</p>
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
                <small>{post.channel}</small>
              </a>
            ))
          )}
        </div>
        <div className="brand-note-links">
          <a className="quiet-link" href={`/${lang}/blog`}>
            {dict.notes.view_blog}
          </a>
          <a className="quiet-link" href={`/${lang}/thinking`}>
            {dict.notes.view_thinking}
          </a>
          <a className="quiet-link" href={`/${lang}/devlog`}>
            {dict.notes.view_all}
          </a>
          {canManageNotes && (
            <a className="quiet-link" href={`/${lang}/admin`}>
              {dict.notes.admin_label}
            </a>
          )}
        </div>
        {canManageNotes && <p className="brand-copy">{dict.notes.admin_hint}</p>}
      </Section>

      <Section
        id="proof"
        label={dict.proof.label}
        title={dict.proof.title}
        intro={dict.proof.intro}
      >
        <div className="proof-shelf">
          {dict.proof.items.map(([title, body]) => (
            <article key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="about"
        label={dict.builder.label}
        title={dict.builder.title}
        intro={dict.builder.body}
      >
        <div className="builder-note">
          <h3>{dict.builder.second_title}</h3>
          <p>{dict.builder.second_body}</p>
        </div>
      </Section>

      <Section
        id="contact"
        label={dict.offers.label}
        title={dict.offers.title}
        intro={dict.offers.intro}
      >
        <div className="offer-grid">
          {dict.offers.items.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
              <strong>{offer.price}</strong>
            </article>
          ))}
        </div>
      </Section>

      <footer>
        <div className="content-wrap brand-footer">
          <div>
            <p className="brand-label">{dict.contact.title}</p>
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

function StatusPanel({ dict }: { dict: HomeDict }) {
  return (
    <aside className="status-panel" aria-label={dict.status.label}>
      <div className="status-panel-top">
        <strong>Agent Flight Recorder</strong>
        <span>SACP canvas · public protocol · GitHub</span>
      </div>
      <div className="status-stack">
        <div>
          <span>ShadowBuyer</span>
          <strong>Web evidence audit · PDF proof · redacted samples</strong>
        </div>
        <div>
          <span>Solo AI Company OS</span>
          <strong>Operating memory · handoffs · reusable skills</strong>
        </div>
      </div>
      <blockquote>{dict.status.quote}</blockquote>
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

      <dl>
        <div>
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>Protocol</dt>
          <dd>{project.thesis}</dd>
        </div>
        <div>
          <dt>Trace</dt>
          <dd>{project.system}</dd>
        </div>
        <div>
          <dt>Next</dt>
          <dd>{project.next}</dd>
        </div>
      </dl>

      <div className="project-proof-links">
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="quiet-link"
        >
          {project.primaryLabel} -&gt;
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
