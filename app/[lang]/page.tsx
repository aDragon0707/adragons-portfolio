import { getDictionary, type Locale } from "@/lib/dictionaries";
import { canUseOwnerTools } from "@/lib/owner-mode";
import { getSortedPostsData } from "@/lib/posts";

type Project = ReturnType<typeof getDictionary>["home"]["projects"]["items"][number];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang).home;
  const isZh = lang === "zh";
  const [featuredProject, ...supportingProjects] = dict.projects.items;
  const recentPosts = getSortedPostsData(lang).slice(0, 3);
  const canManageNotes = await canUseOwnerTools();

  const resolveHref = (href: string) =>
    href.startsWith("#") ? `/${lang}${href}` : href;

  return (
    <main className={`site-shell ${isZh ? "cjk-safe" : ""}`}>
      <section id="hero" className="section-frame">
        <div className="content-wrap py-14 md:py-20">
          <h1
            className={`hero-title hero-title-strip reveal text-balance text-4xl font-bold leading-[0.98] tracking-normal text-[color:var(--ink)] sm:text-5xl md:text-6xl ${
              isZh ? "lg:text-7xl" : "lg:text-6xl"
            }`}
          >
            {dict.hero.title}
          </h1>

          <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,0.88fr)_minmax(20rem,0.72fr)] md:items-start md:mt-14">
          <div className="measure">
            <p className="reveal text-sm font-semibold text-[color:var(--muted)]">
            {dict.hero.tagline}
          </p>
            <h2 className="serif-type reveal mt-4 max-w-2xl text-2xl font-semibold leading-9 text-[color:var(--ink)] md:text-3xl">
              {dict.hero.intro_title}
            </h2>
            <p className="serif-type hero-description reveal mt-5 text-pretty text-lg leading-8 text-[color:var(--muted)]">
              {dict.hero.description}
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a href={`/${lang}#projects`} className="button-link primary-action text-sm">
                {dict.hero.cta_projects}
              </a>
              <a
                href={dict.hero.github_href}
                target="_blank"
                rel="noopener noreferrer"
                className="button-link text-sm"
              >
                {dict.hero.cta_contact}
              </a>
            </div>
          </div>

          <aside className="project-index-panel reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
              {dict.projects.eyebrow}
            </p>
            <div className="mt-3">
              {dict.projects.items.map((project, index) => (
                <a
                  key={project.title}
                  href={`/${lang}#projects`}
                  className="group grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-[color:var(--line)] py-3 text-sm no-underline last:border-b"
                >
                  <span className="text-[color:var(--faint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--blue)]">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block text-[color:var(--muted)]">
                      {project.category}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </aside>
          </div>
        </div>
      </section>

      <section className="section-frame">
        <div className="content-wrap py-10 md:py-14">
          <figure className="artifact-figure reveal">
            <img
              src="/assets/solo-ai-company-os-home.zh-CN.svg"
              alt="Solo AI Company OS product map"
              className="block aspect-[1400/820] w-full object-contain"
            />
            <figcaption className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              Solo AI Company OS, shown as the public anchor artifact for the broader personal operating-system work.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="about" className="section-frame">
        <div className="content-wrap grid gap-8 py-16 md:grid-cols-[12rem_minmax(0,1fr)] md:py-20">
          <h2 className="reveal text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
            {dict.about.title}
          </h2>
          <div>
            <p className="reveal wide-measure text-pretty text-xl leading-9 text-[color:var(--ink)]">
              {dict.about.body}
            </p>
            <div className="reveal mt-8">
              <p className="mb-3 text-sm font-semibold text-[color:var(--muted)]">
                {dict.about.skills_label}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {dict.about.skills.map((skill) => (
                  <span key={skill} className="tag-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section-frame">
        <div className="content-wrap py-16 md:py-20">
          <div className="grid gap-5 md:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="reveal text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
                {dict.projects.subtitle}
              </p>
            </div>
            <div>
              <h2 className="reveal text-4xl font-bold text-[color:var(--ink)] md:text-5xl">
                {dict.projects.title}
              </h2>
              <p className="reveal mt-4 wide-measure text-pretty text-base leading-7 text-[color:var(--muted)]">
                {dict.projects.description}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8">
            <ProjectCard
              project={featuredProject}
              featured
              href={resolveHref(featuredProject.primaryHref)}
            />

            <div>
              {supportingProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  href={resolveHref(project.primaryHref)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-frame">
        <div className="content-wrap grid gap-8 py-16 md:grid-cols-[12rem_minmax(0,1fr)] md:py-20">
          <div>
            <h2 className="reveal text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
              {dict.services.title}
            </h2>
          </div>
          <div>
            <p className="reveal wide-measure text-pretty text-xl leading-9 text-[color:var(--ink)]">
              {dict.services.subtitle}
            </p>
            <div className="reveal mt-8">
              {dict.services.items.map(({ title, desc }, index) => (
                <div key={title} className="principle-row">
                  <span className="text-sm text-[color:var(--faint)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[color:var(--ink)]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="notes" className="section-frame">
        <div className="content-wrap grid gap-8 py-16 md:grid-cols-[12rem_minmax(0,1fr)] md:py-20">
          <div>
            <h2 className="reveal text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
              {dict.notes.title}
            </h2>
          </div>
          <div>
            <p className="reveal wide-measure text-pretty text-xl leading-9 text-[color:var(--ink)]">
              {dict.notes.subtitle}
            </p>

            <div className="reveal mt-8">
              {recentPosts.length === 0 ? (
                <p className="text-sm text-[color:var(--muted)]">
                  {dict.notes.empty}
                </p>
              ) : (
                <div className="notes-list">
                  {recentPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/${lang}/devlog/${post.slug}`}
                      className="note-row group"
                    >
                      <time dateTime={post.date}>{post.date}</time>
                      <span className="group-hover:text-[color:var(--blue)]">
                        {post.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="reveal mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a className="quiet-link" href={`/${lang}/devlog`}>
                {dict.notes.view_all}
              </a>
              {canManageNotes && (
                <a className="quiet-link" href={`/${lang}/admin`}>
                  {dict.notes.admin_label}
                </a>
              )}
            </div>
            {canManageNotes && (
              <p className="reveal mt-3 text-sm text-[color:var(--muted)]">
                {dict.notes.admin_hint}
              </p>
            )}
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="content-wrap py-14">
          <div className="grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)]">
            <h2 className="reveal text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
              {dict.contact.title}
            </h2>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
              <div>
              <p className="reveal max-w-2xl text-lg leading-8 text-[color:var(--ink)]">
                {dict.contact.body}
              </p>
              <div className="reveal mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
              <p className="mt-10 text-xs tracking-wide text-[color:var(--faint)]">
                © {new Date().getFullYear()} {dict.contact.footer}
              </p>
              </div>

              <a
                className="qr-card no-underline"
                href={dict.contact.public_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/portfolio-qr.svg"
                  alt={dict.contact.qr_label}
                />
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
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectCard({
  project,
  href,
  featured = false,
}: {
  project: Project;
  href: string;
  featured?: boolean;
}) {
  const isExternal = !project.primaryHref.startsWith("#");

  return (
    <article className={`project-card reveal ${featured ? "is-featured" : ""}`}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="status-chip"
            data-tone={project.isPublic ? "public" : "preview"}
          >
            {project.status}
          </span>
          <span className="text-sm text-[color:var(--muted)]">
            {project.category}
          </span>
        </div>
        <h3
          className={`project-title mt-3 font-semibold text-[color:var(--ink)] ${
            featured ? "text-3xl md:text-4xl" : "text-2xl"
          }`}
        >
          {project.title}
        </h3>
      </div>

      <div>
        <p className="text-pretty text-base leading-7 text-[color:var(--muted)]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="quiet-link inline-flex text-sm"
          >
            {project.primaryLabel} -&gt;
          </a>

          {project.secondaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="evidence-link text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
