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
    { href: `/${lang}`, label: dict.home },
    { href: `/${lang}/blog`, label: dict.blog },
    { href: `/${lang}/thinking`, label: dict.thinking },
    { href: `/${lang}/projects`, label: dict.projects },
    { href: `/${lang}#about`, label: dict.about },
    { href: `/${lang}#contact`, label: dict.contact },
  ];

  const socialLinks = [
    { href: "https://x.com/Adragon021", label: "X", icon: "x" },
    { href: "https://www.reddit.com/user/Dazzling_Network_815", label: "Reddit", icon: "reddit" },
    { href: "https://github.com/aDragon0707", label: "GitHub", icon: "github" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[color:oklch(0.992_0.004_300_/_0.82)] backdrop-blur-xl">
      <nav className="content-wrap flex items-center justify-between py-4">
        <Link
          href={`/${lang}`}
          className="brand-logo no-underline transition hover:text-[color:var(--blue)]"
        >
          <span aria-hidden="true" />
          <strong>{dict.logo}</strong>
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-[color:var(--muted)] lg:flex">
          {links.map(({ href, label }) => {
            const isActive =
              (href === `/${lang}` && pathname === `/${lang}`) ||
              (href.includes("/blog") && pathname?.includes("/blog")) ||
              (href.includes("/thinking") && pathname?.includes("/thinking")) ||
              (href.includes("/projects") && pathname?.includes("/projects")) ||
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

          {socialLinks.map(({ href, label, icon }) => {
            const isExternal = href.startsWith("http");
            return (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="nav-social-link"
                >
                  <SocialIcon name={icon} />
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

function SocialIcon({ name }: { name: string }) {
  if (name === "x") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M18.9 3h2.8l-7.6 8.7L23 21h-6.9l-5.4-7.1L4.5 21H1.7l8.1-9.3L1 3h7l5 6.5L18.9 3Zm-2.5 16h1.9L7.8 5H5.9l10.5 14Z" />
      </svg>
    );
  }

  if (name === "reddit") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          fill="#FF4500"
          d="M12 3.2a9.1 9.1 0 0 0-8 13.4l-.7 2.6 2.7-.7a9.1 9.1 0 1 0 6-15.3Z"
        />
        <path
          fill="#fff"
          d="M9.3 13.7a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm5.4 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z"
        />
        <path
          fill="#fff"
          d="M8.3 11.2c0-.3.2-.5.5-.5.5 0 1.1-.3 1.9-.6a8 8 0 0 1 2.6-.5c1.2 0 2.2.3 3 .7.2.1.3.4.2.6-.1.2-.4.3-.6.2-.7-.4-1.6-.6-2.6-.6-.8 0-1.5.1-2.1.4-.8.3-1.4.7-2.2.7-.3 0-.5-.2-.5-.4Z"
        />
        <path
          fill="#fff"
          d="M7.7 15.1c.2-.2.5-.2.7 0 .9.7 2.1 1 3.6 1s2.7-.3 3.6-1c.2-.2.5-.2.7 0s.2.5 0 .7c-1.1.9-2.5 1.3-4.3 1.3s-3.2-.4-4.3-1.3c-.2-.2-.2-.5 0-.7Z"
        />
        <path
          fill="#fff"
          d="M15.7 7.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"
        />
        <path
          fill="#fff"
          d="M13.4 4.3c0-.4.3-.7.7-.7.3 0 .6.2.6.5 0 .6-.4 1-.8 1.4-.2.2-.5.2-.7 0a.5.5 0 0 1 0-.7c.1-.1.2-.3.2-.5Z"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.9 4.7 18 5 18 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.8c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
