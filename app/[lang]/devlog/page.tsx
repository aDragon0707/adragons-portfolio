import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === "zh";
  return {
    title: isZh ? "思考 | ADRAGON" : "Notes | ADRAGON",
    description: isZh
      ? "个人思考、构建笔记与系统反思。"
      : "Personal thinking, build notes, and system reflections.",
  };
}

export default async function DevlogPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang).devlog;
  const posts = getSortedPostsData(lang as Locale);

  return (
    <main className={`content-wrap py-16 md:py-20 ${lang === "zh" ? "cjk-safe" : ""}`}>
      <div className="mb-10 grid gap-5 border-b border-[color:var(--line)] pb-8 md:grid-cols-[12rem_minmax(0,1fr)]">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
          {dict.path}
        </p>
        <div>
          <h1 className="text-5xl font-bold text-[color:var(--ink)] md:text-6xl">
            {dict.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {dict.subtitle}
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-[color:var(--muted)]">{dict.empty}</p>
      ) : (
        <ul className="notes-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${lang}/devlog/${post.slug}`}
                className="note-row group"
              >
                <time dateTime={post.date}>{post.date}</time>
                <span className="group-hover:text-[color:var(--blue)]">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
