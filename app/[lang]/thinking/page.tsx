import { ArchiveView } from "../devlog/ArchiveView";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang).archive;
  return {
    title: `${dict.thinking_title} | ADRAGON`,
    description: dict.thinking_subtitle,
  };
}

export default async function ThinkingPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang).archive;
  const posts = getSortedPostsData(lang).filter(
    (post) => post.channel === "thinking" || post.channel === "build"
  );

  return (
    <ArchiveView
      lang={lang}
      dict={dict}
      posts={posts}
      path={dict.thinking_path}
      title={dict.thinking_title}
      subtitle={dict.thinking_subtitle}
    />
  );
}
