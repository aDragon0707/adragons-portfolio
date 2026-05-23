import { ArchiveView } from "../devlog/ArchiveView";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { getPostsByChannel } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang).archive;
  return {
    title: `${dict.blog_title} | ADRAGON`,
    description: dict.blog_subtitle,
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang).archive;

  return (
    <ArchiveView
      lang={lang}
      dict={dict}
      posts={getPostsByChannel(lang, "tech")}
      path={dict.blog_path}
      title={dict.blog_title}
      subtitle={dict.blog_subtitle}
    />
  );
}
