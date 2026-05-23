import type { Locale, getDictionary } from "@/lib/dictionaries";
import type { ReactNode } from "react";

type HomeDict = ReturnType<typeof getDictionary>["home"];
type Project = HomeDict["projects"]["items"][number];

export function HomeView({
  lang,
  dict,
  canManageNotes,
}: {
  lang: Locale;
  dict: HomeDict;
  canManageNotes: boolean;
}) {
  const isZh = lang === "zh";
  const resolveHref = (href: string) =>
    href.startsWith("#") ? `/${lang}${href}` : href;

  return (
    <main className={`site-shell ip-home ${isZh ? "cjk-safe" : ""}`}>
      <section id="hero" className="ip-hero section-frame">
        <div className="content-wrap ip-hero-grid">
          <div className="ip-hero-copy">
            <p className="ip-eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="ip-hero-title">
              {isZh ? (
                <>
                  <span>AI Agent 需要证据，</span>
                  <span>不只需要答案。</span>
                </>
              ) : (
                dict.hero.title
              )}
            </h1>
            <p className="ip-hero-subtitle">{dict.hero.intro_title}</p>
            <p className="ip-copy">{dict.hero.description}</p>
            <div className="ip-actions">
              <a className="button-link primary-action" href={`/${lang}#about`}>
                {dict.hero.cta_primary}
              </a>
              <a className="button-link" href={`/${lang}#contact`}>
                {dict.hero.cta_secondary}
              </a>
            </div>
          </div>

          <ReceiptPanel dict={dict} />
        </div>
      </section>

      <Section
        id="about"
        label={dict.builder.label}
        title={dict.builder.title}
        intro={dict.builder.body}
      >
        <div className="ip-split-panel">
          <article>
            <h3>{dict.builder.second_title}</h3>
            <p>{dict.builder.second_body}</p>
          </article>
        </div>
      </Section>

      <Section
        id="principles"
        label={dict.principles.label}
        title={dict.principles.title}
      >
        <div className="ip-do-grid">
          <article className="ip-card">
            <span className="ip-card-meta">{dict.principles.do_title}</span>
            <div className="ip-rule-list">
              {dict.principles.do.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
          <article className="ip-card">
            <span className="ip-card-meta">{dict.principles.dont_title}</span>
            <div className="ip-rule-list">
              {dict.principles.dont.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </div>
      </Section>

      <Section
        id="loop"
        label={dict.loop.label}
        title={dict.loop.title}
        intro={dict.loop.intro}
      >
        <div className="ip-loop">
          {dict.loop.items.map(([title, body]) => (
            <div className="ip-loop-step" key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
        </div>
      </Section>

      <section id="projects" className="section-frame">
        <div className="content-wrap ip-section-grid">
          <p className="ip-label">{dict.projects.eyebrow}</p>
          <div>
            <h2 className="ip-section-title">{dict.projects.title}</h2>
            <p className="ip-copy ip-section-intro">
              {dict.projects.description}
            </p>

            <div className="ip-projects">
              {dict.projects.items.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  href={resolveHref(project.primaryHref)}
                  priority={index < 3}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        id="notes"
        label={dict.notes.label}
        title={dict.notes.title}
        intro={dict.notes.subtitle}
      >
        <div className="ip-note-links">
          <a className="quiet-link" href={`/${lang}/devlog`}>
            {dict.notes.view_all}
          </a>
          {canManageNotes && (
            <a className="quiet-link" href={`/${lang}/admin`}>
              {dict.notes.admin_label}
            </a>
          )}
        </div>
        {canManageNotes && <p className="ip-copy">{dict.notes.admin_hint}</p>}
      </Section>

      <Section
        id="contact"
        label={dict.offers.label}
        title={dict.offers.title}
        intro={dict.offers.intro}
      >
        <div className="ip-offer-grid">
          {dict.offers.items.map((offer) => (
            <article className="ip-card ip-offer" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
              <strong>{offer.price}</strong>
            </article>
          ))}
        </div>
      </Section>

      {canManageNotes && (
        <section id="owner-loop" className="ip-private section-frame">
          <div className="content-wrap">
            <p className="ip-label">{dict.private_loop.label}</p>
            <h2 className="ip-section-title">{dict.private_loop.title}</h2>
            <p className="ip-copy ip-section-intro">
              {dict.private_loop.intro}
            </p>
            <div className="ip-private-grid">
              {dict.private_loop.days.map((day, index) => (
                <article className="ip-private-day" key={day}>
                  <strong>Day {index + 1}</strong>
                  <p>{day}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer>
        <div className="content-wrap ip-footer">
          <div>
            <p className="ip-label">{dict.contact.title}</p>
            <p className="ip-footer-copy">{dict.contact.body}</p>
            <div className="ip-footer-links">
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
      <div className="content-wrap ip-section-grid">
        <p className="ip-label">{label}</p>
        <div>
          <h2 className="ip-section-title">{title}</h2>
          {intro && <p className="ip-copy ip-section-intro">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

function ReceiptPanel({ dict }: { dict: HomeDict }) {
  const shortRows = [
    "Tests claimed. Evidence required.",
    "Missing logs and human review.",
    "SACP 412. Fix required. Hash ready.",
  ];

  return (
    <aside className="ip-receipt-panel" aria-label="Agent receipt preview">
      <div className="ip-receipt-head">
        <span>{dict.signal.eyebrow_left}</span>
        <span>{dict.signal.eyebrow_right}</span>
      </div>
      <div className="ip-receipt">
        {dict.signal.rows.map(([label, value], index) => (
          <div className="ip-receipt-row" key={label}>
            <span>{label}</span>
            <strong>
              <span className="ip-receipt-full">{value}</span>
              <span className="ip-receipt-short">{shortRows[index]}</span>
            </strong>
          </div>
        ))}
        <div className="ip-receipt-chips">
          {dict.signal.chips.map((chip, index) => (
            <span key={chip} data-tone={index}>
              {chip}
            </span>
          ))}
        </div>
      </div>
      <p>{dict.signal.foot}</p>
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
    <article className={`ip-project ${priority ? "is-priority" : ""}`}>
      <div>
        <div className="ip-project-meta">
          <span data-tone={project.isPublic ? "public" : "preview"}>
            {project.status}
          </span>
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <div className="ip-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div>
        <p>{project.description}</p>
        <div className="ip-project-links">
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
      </div>
    </article>
  );
}
