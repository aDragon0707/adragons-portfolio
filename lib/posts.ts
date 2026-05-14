import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/dictionaries";

function postsDir(lang: Locale): string {
  return path.join(process.cwd(), "posts", lang);
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
}

export function getSortedPostsData(lang: Locale): PostMeta[] {
  const dir = postsDir(lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(
  slug: string,
  lang: Locale
): Promise<{ meta: PostMeta; content: string }> {
  const filePath = path.join(postsDir(lang), `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug} [${lang}]`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
    },
    content,
  };
}
