"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/dictionaries";

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; zhFilename: string; enFilename: string }
  | { type: "error"; message: string };

export default function WritingDesk({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang).admin;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const titleRef = useRef<HTMLInputElement>(null);

  const isLoading = status.type === "loading";

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      setStatus({ type: "error", message: dict.error_required });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/save-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Unknown server error.",
        });
        return;
      }

      setStatus({
        type: "success",
        zhFilename: data.zhFilename,
        enFilename: data.enFilename,
      });
      setTitle("");
      setContent("");
      titleRef.current?.focus();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Network error.",
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  }

  return (
    <main className="content-wrap py-16 md:py-20">
      <div className="mb-10 grid gap-5 border-b border-[color:var(--line)] pb-8 md:grid-cols-[12rem_minmax(0,1fr)]">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--faint)]">
          {dict.path}
        </p>
        <div>
          <h1 className="text-5xl font-bold text-[color:var(--ink)]">
            {dict.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            {dict.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-3xl space-y-6" onKeyDown={handleKeyDown}>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-[color:var(--muted)]"
          >
            {dict.label_title}
          </label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            placeholder={dict.placeholder_title}
            className="
              w-full rounded-md border border-[color:var(--line)] bg-[color:var(--surface)]
              px-4 py-3 text-base text-[color:var(--ink)]
              placeholder:text-[color:var(--faint)]
              transition-colors focus:border-[color:var(--blue)] focus:outline-none focus:ring-0
              disabled:opacity-40
            "
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-semibold text-[color:var(--muted)]"
          >
            {dict.label_content}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            placeholder={dict.placeholder_content}
            rows={22}
            className="
              w-full resize-y rounded-md border border-[color:var(--line)] bg-[color:var(--surface)]
              px-4 py-3 text-base leading-8 text-[color:var(--ink)]
              placeholder:text-[color:var(--faint)]
              transition-colors focus:border-[color:var(--blue)] focus:outline-none focus:ring-0
              disabled:opacity-40
            "
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="button-link primary-action text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? dict.btn_saving : dict.btn_save}
          </button>

          {(title || content) && !isLoading && (
            <button
              onClick={() => {
                setTitle("");
                setContent("");
                setStatus({ type: "idle" });
                titleRef.current?.focus();
              }}
              className="quiet-link text-sm"
            >
              {dict.btn_clear}
            </button>
          )}
        </div>

        {status.type === "success" && (
          <div className="space-y-1 rounded-md border border-[color:oklch(0.72_0.08_155)] bg-[color:oklch(0.96_0.03_155)] px-4 py-3 text-sm text-[color:var(--green)]">
            <div>
              {dict.success_zh_prefix} /posts/zh/{status.zhFilename}
            </div>
            <div>
              {dict.success_en_prefix} /posts/en/{status.enFilename}
            </div>
          </div>
        )}

        {status.type === "error" && (
          <div className="rounded-md border border-[color:oklch(0.72_0.12_28)] bg-[color:oklch(0.96_0.025_28)] px-4 py-3 text-sm text-[color:oklch(0.48_0.15_28)]">
            {dict.error_prefix} {status.message}
          </div>
        )}
      </div>

      <p className="mt-12 text-sm text-[color:var(--muted)]">
        {dict.hint_prefix}{" "}
        <Link href={`/${lang}/devlog`} className="quiet-link">
          {dict.hint_link}
        </Link>{" "}
        {dict.hint_suffix}
      </p>
    </main>
  );
}
