import { getDictionary, type Locale } from "@/lib/dictionaries";
import { canUseOwnerTools } from "@/lib/owner-mode";
import { getSortedPostsData } from "@/lib/posts";
import { HomeView } from "./home-sections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang).home;
  const canManageNotes = await canUseOwnerTools();
  const posts = getSortedPostsData(lang).slice(0, 4);

  return (
    <HomeView
      lang={lang}
      dict={dict}
      canManageNotes={canManageNotes}
      posts={posts}
    />
  );
}
