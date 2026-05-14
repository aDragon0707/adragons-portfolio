import { LOCALES, getDictionary, type Locale } from "@/lib/dictionaries";
import Nav from "@/components/Nav";
import AnnotationWidget from "@/components/AnnotationWidget";
import { canUseOwnerTools } from "@/lib/owner-mode";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const canAnnotate = await canUseOwnerTools();

  return (
    <>
      <Nav lang={lang as Locale} dict={dict.nav} />
      {children}
      {canAnnotate && <AnnotationWidget />}
    </>
  );
}
