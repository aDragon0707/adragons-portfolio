import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSortedPostsData, getPostData } from "@/lib/posts";
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
  const dict = getDictionary(lang).devlog;

  let meta: Awaited<ReturnType<typeof getPostData>>["meta"];
  let content: string;

  try {
    ({ meta, content } = await getPostData(slug, lang as Locale));
  } catch {
    notFound();
  }

  const isZh = lang === "zh";

  return (
    <main className={`article-shell content-wrap py-16 md:py-24 ${isZh ? "cjk-safe" : ""}`}>
      <nav className="article-kicker mb-10 flex items-center gap-2 text-sm text-[color:var(--muted)]">
        <Link
          href={`/${lang}/devlog`}
          className="quiet-link"
        >
          {dict.path}
        </Link>
        <span>/</span>
        <span className="text-[color:var(--faint)]">{slug}</span>
      </nav>

      <header className="article-header mb-12 border-b border-[color:var(--line)] pb-10">
        <time
          dateTime={meta.date}
          className="mb-5 block text-sm text-[color:var(--faint)]"
        >
          {meta.date}
        </time>
        <h1 className="article-title text-balance text-4xl font-bold leading-tight text-[color:var(--ink)] md:text-6xl">
          {meta.title}
        </h1>
      </header>

      <article
        className="
          devlog-prose prose
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-a:text-[color:var(--blue)] hover:prose-a:text-[color:var(--ink)]
          prose-p:text-[color:var(--ink)] prose-li:text-[color:var(--ink)]
          prose-strong:font-semibold prose-strong:text-[color:var(--ink)]
          prose-code:text-[color:var(--ink)] prose-pre:text-sm
          prose-hr:border-[color:var(--line)]
        "
      >
        <MDXRemote source={content} />
      </article>

      <div className="article-footer mt-16 border-t border-[color:var(--line)] pt-8">
        <Link
          href={`/${lang}/devlog`}
          className="quiet-link text-sm"
        >
          {dict.back}
        </Link>
      </div>
    </main>
  );
}
