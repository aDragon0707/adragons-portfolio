import { notFound } from "next/navigation";
import { canUseOwnerTools } from "@/lib/owner-mode";
import type { Locale } from "@/lib/dictionaries";
import WritingDesk from "./WritingDesk";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!(await canUseOwnerTools())) {
    notFound();
  }

  return <WritingDesk lang={lang as Locale} />;
}
