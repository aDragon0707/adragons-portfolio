import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getChannelLabel, getSortedPostsData, getPostData } from "@/lib/posts";
import { getDictionary, LOCALES, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getSortedPostsData(lang).map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  try {
    const { meta } = await getPostData(slug, lang as Locale);
    return { title: `${meta.title} | Notes` };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang).archive;

  let meta: Awaited<ReturnType<typeof getPostData>>["meta"];
  let content: string;

  try {
    ({ meta, content } = await getPostData(slug, lang as Locale));
  } catch {
    notFound();
  }

  const isZh = lang === "zh";

  return (
    <main className={`article-shell article-rail ${isZh ? "cjk-safe" : ""}`}>
      <nav className="article-kicker content-wrap">
        <Link href={`/${lang}/devlog`} className="quiet-link">
          {dict.all_path}
        </Link>
        <span>/</span>
        <span className="text-[color:var(--faint)]">{slug}</span>
      </nav>

      <header className="article-header content-wrap">
        <time dateTime={meta.date}>
          {meta.date} / {getChannelLabel(dict.channels, meta.channel)}
        </time>
        <h1 className="article-title">{meta.title}</h1>
        {meta.summary && <p>{meta.summary}</p>}
        {meta.tags.length > 0 && (
          <div className="lab-tags">
            {meta.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </header>

      <article className="devlog-prose prose content-wrap">
        <MDXRemote source={content} />
      </article>

      <div className="article-footer content-wrap">
        <Link href={`/${lang}/devlog`} className="quiet-link text-sm">
          {dict.back}
        </Link>
      </div>
    </main>
  );
}
