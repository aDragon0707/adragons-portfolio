"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, Dictionary } from "@/lib/dictionaries";

interface NavProps {
  lang: Locale;
  dict: Dictionary["nav"];
}

export default function Nav({ lang, dict }: NavProps) {
  const pathname = usePathname();

  const otherLang: Locale = lang === "en" ? "zh" : "en";
  const pathWithoutLocale = pathname.replace(/^\/(en|zh)/, "") || "";
  const switchHref = `/${otherLang}${pathWithoutLocale}`;

  const links = [
    { href: `/${lang}#about`, label: dict.about },
    { href: `/${lang}#projects`, label: dict.projects },
    { href: `/${lang}#services`, label: dict.services },
    { href: `/${lang}#contact`, label: dict.contact },
    { href: `/${lang}/devlog`, label: dict.devlog },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:oklch(0.985_0.006_90_/_0.86)] backdrop-blur-xl">
      <nav className="content-wrap flex items-center justify-between py-4">
        <Link
          href={`/${lang}`}
          className="text-sm font-semibold tracking-[0.12em] text-[color:var(--ink)] no-underline transition hover:text-[color:var(--blue)]"
        >
          {dict.logo}
        </Link>

        <ul className="hidden items-center gap-5 text-sm text-[color:var(--muted)] md:flex">
          {links.map(({ href, label }) => {
            const isActive =
              (href.includes("/devlog") && pathname?.includes("/devlog")) ||
              (href.includes("/admin") && pathname?.includes("/admin"));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`no-underline transition hover:text-[color:var(--blue)] ${
                    isActive ? "text-[color:var(--blue)]" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          <li>
            <Link
              href={switchHref}
              className="button-link min-h-0 px-3 py-1 text-xs text-[color:var(--muted)]"
            >
              {dict.lang_switch}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
