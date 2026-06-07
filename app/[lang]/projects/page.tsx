import { getDictionary, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.nav.projects} | ADRAGON`,
    description: dict.home.projects.description,
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang).home;
  const specLabels = dict.projects.spec_labels;
  const groups = dict.projects.groups;

  let runningIndex = 0;

  return (
    <main className={`project-ledger-page ${lang === "zh" ? "cjk-safe" : ""}`}>
      <header className="content-wrap archive-header ledger-header">
        <p className="brand-label">{dict.projects.eyebrow}</p>
        <h1>{dict.projects.title}</h1>
        <p>{dict.projects.description}</p>
      </header>

      <div className="content-wrap project-ledger-list">
        {groups.map((group) => {
          const groupItems = dict.projects.items.filter(
            (item) => item.role === group.key,
          );
          if (groupItems.length === 0) return null;

          return (
            <section
              key={group.key}
              id={group.key}
              className="role-group"
              aria-label={group.label}
            >
              <div className="role-group-head">
                <h2 className="role-group-label">{group.label}</h2>
                <p className="role-group-caption">{group.caption}</p>
              </div>

              <div className="role-group-list">
                {groupItems.map((project) => {
                  runningIndex += 1;
                  const isExternal = !project.primaryHref.startsWith("#");
                  const href = project.primaryHref.startsWith("#")
                    ? `/${lang}${project.primaryHref}`
                    : project.primaryHref;

                  return (
                    <article
                      className="project-ledger-card"
                      key={project.title}
                    >
                      <div className="project-ledger-index">
                        {String(runningIndex).padStart(2, "0")}
                      </div>
                      <div className="project-ledger-main">
                        <div className="project-proof-meta">
                          <span data-tone={project.isPublic ? "public" : "preview"}>
                            {project.status}
                          </span>
                          <span>{project.category}</span>
                        </div>
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                        <div className="lab-tags">
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <dl className="project-ledger-spec">
                        <div>
                          <dt>{specLabels.problem}</dt>
                          <dd>{project.problem}</dd>
                        </div>
                        <div>
                          <dt>{specLabels.thesis}</dt>
                          <dd>{project.thesis}</dd>
                        </div>
                        <div>
                          <dt>{specLabels.system}</dt>
                          <dd>{project.system}</dd>
                        </div>
                        <div>
                          <dt>{specLabels.next}</dt>
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
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
