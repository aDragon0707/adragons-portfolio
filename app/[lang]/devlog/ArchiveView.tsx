import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { getChannelLabel, type PostMeta } from "@/lib/posts";

export function ArchiveView({
  lang,
  dict,
  posts,
  path,
  title,
  subtitle,
}: {
  lang: Locale;
  dict: Dictionary["archive"];
  posts: PostMeta[];
  path: string;
  title: string;
  subtitle: string;
}) {
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  return (
    <main className={`archive-shell brand-archive ${lang === "zh" ? "cjk-safe" : ""}`}>
      <header className="content-wrap archive-header">
        <p className="brand-label">{path}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </header>

      {posts.length === 0 ? (
        <div className="content-wrap">
          <p className="brand-copy">{dict.empty}</p>
        </div>
      ) : (
        <div className="content-wrap archive-layout">
          {featured && (
            <Link
              href={`/${lang}/devlog/${featured.slug}`}
              className="featured-note"
            >
              <span>{dict.featured}</span>
              <time dateTime={featured.date}>{featured.date}</time>
              <strong>{featured.title}</strong>
              {featured.summary && <p>{featured.summary}</p>}
              <small>{getChannelLabel(dict.channels, featured.channel)}</small>
            </Link>
          )}

          <div className="archive-list">
            {rest.map((post) => (
              <Link
                href={`/${lang}/devlog/${post.slug}`}
                className="archive-row"
                key={post.slug}
              >
                <time dateTime={post.date}>{post.date}</time>
                <div>
                  <strong>{post.title}</strong>
                  {post.summary && <p>{post.summary}</p>}
                  <small>{getChannelLabel(dict.channels, post.channel)}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
