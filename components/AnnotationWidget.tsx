"use client";

import { useEffect, useMemo, useState } from "react";

type TargetInfo = {
  url: string;
  title: string;
  viewport: string;
  selector: string;
  tag: string;
  id: string;
  classes: string;
  role: string;
  text: string;
  rect: string;
  click: string;
  ancestry: string;
};

const initialTarget: TargetInfo | null = null;

export default function AnnotationWidget() {
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState<TargetInfo | null>(initialTarget);
  const [comment, setComment] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (!active) return;

    const overlay = document.createElement("div");
    overlay.className = "ui-annotate-hover";
    document.body.appendChild(overlay);

    function hideOverlay() {
      overlay.style.display = "none";
    }

    function moveOverlay(event: MouseEvent) {
      const element = getAnnotatableElement(event.target);
      if (!element || element.closest("[data-annotate-ui]")) {
        hideOverlay();
        return;
      }
      const rect = element.getBoundingClientRect();
      overlay.style.display = "block";
      overlay.style.left = `${rect.left}px`;
      overlay.style.top = `${rect.top}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
    }

    function capture(event: MouseEvent) {
      const element = getAnnotatableElement(event.target);
      if (!element || element.closest("[data-annotate-ui]")) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setTarget(buildTargetInfo(element, event));
      setComment("");
      setCopyState("idle");
      setActive(false);
      hideOverlay();
    }

    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
        hideOverlay();
      }
    }

    document.addEventListener("mousemove", moveOverlay, true);
    document.addEventListener("click", capture, true);
    document.addEventListener("keydown", keydown, true);

    return () => {
      document.removeEventListener("mousemove", moveOverlay, true);
      document.removeEventListener("click", capture, true);
      document.removeEventListener("keydown", keydown, true);
      overlay.remove();
    };
  }, [active]);

  const prompt = useMemo(() => {
    if (!target) return "";
    return [
      "请根据这个 UI 批注修改网站：",
      "",
      `用户反馈：${comment || "（请在这里补充具体不满意点）"}`,
      "",
      `URL：${target.url}`,
      `页面标题：${target.title}`,
      `视口：${target.viewport}`,
      `点击坐标：${target.click}`,
      `元素：${target.tag}`,
      `selector：${target.selector}`,
      `id：${target.id || "无"}`,
      `class：${target.classes || "无"}`,
      `role：${target.role || "无"}`,
      `文本：${target.text || "无"}`,
      `位置尺寸：${target.rect}`,
      `DOM 上下文：${target.ancestry}`,
    ].join("\n");
  }, [comment, target]);

  async function copyPrompt() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        className={`annotate-entry ${active ? "is-active" : ""}`}
        data-annotate-ui
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setActive((value) => !value);
          setTarget(null);
          setCopyState("idle");
        }}
      >
        批注 / Annotate
      </button>

      {active && (
        <div className="annotate-toolbar" data-annotate-ui>
          <span>点击页面任意元素来记录问题位置。Esc 退出。</span>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActive(false);
            }}
          >
            退出
          </button>
        </div>
      )}

      {target && (
        <div className="annotate-panel" data-annotate-ui>
          <div className="annotate-panel-head">
            <strong>这处哪里不舒服？</strong>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setTarget(null);
              }}
            >
              关闭
            </button>
          </div>
          <p>{target.selector}</p>
          <textarea
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              setCopyState("idle");
            }}
            placeholder="例如：这一块太挤、标题没重点、按钮不明显、移动端看着乱..."
            rows={4}
          />
          <button type="button" className="button-link primary-action" onClick={copyPrompt}>
            {copyState === "copied"
              ? "已复制，可以粘给 Codex"
              : copyState === "failed"
                ? "复制失败，请手动选中内容"
                : "复制批注给 Codex"}
          </button>
          {copyState === "failed" && <pre className="annotate-fallback">{prompt}</pre>}
        </div>
      )}
    </>
  );
}

function getAnnotatableElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  return target;
}

function buildTargetInfo(element: HTMLElement, event: MouseEvent): TargetInfo {
  const rect = element.getBoundingClientRect();
  return {
    url: window.location.href,
    title: document.title,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    selector: getSelector(element),
    tag: element.tagName.toLowerCase(),
    id: element.id,
    classes: Array.from(element.classList).join(" "),
    role: element.getAttribute("role") || "",
    text: compactText(element.innerText || element.textContent || ""),
    rect: `${Math.round(rect.left)},${Math.round(rect.top)},${Math.round(rect.width)}x${Math.round(rect.height)}`,
    click: `${Math.round(event.clientX)},${Math.round(event.clientY)}`,
    ancestry: getAncestry(element),
  };
}

function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim().slice(0, 240);
}

function getSelector(element: HTMLElement): string {
  if (element.id) return `#${CSS.escape(element.id)}`;
  const parts: string[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== document.body && parts.length < 5) {
    const tag = current.tagName.toLowerCase();
    const className = Array.from(current.classList)
      .filter((name) => !name.startsWith("hover:") && !name.startsWith("md:"))
      .slice(0, 2)
      .map((name) => `.${CSS.escape(name)}`)
      .join("");
    const parent: HTMLElement | null = current.parentElement;
    const currentTag = current.tagName;
    const siblings: Element[] = parent
      ? Array.from(parent.children).filter((child) => child.tagName === currentTag)
      : [];
    const nth =
      siblings.length > 1 && parent
        ? `:nth-of-type(${siblings.indexOf(current) + 1})`
        : "";
    parts.unshift(`${tag}${className}${nth}`);
    current = parent;
  }

  return parts.join(" > ");
}

function getAncestry(element: HTMLElement): string {
  const parts: string[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== document.body && parts.length < 5) {
    const label = [
      current.tagName.toLowerCase(),
      current.id ? `#${current.id}` : "",
      current.classList.length ? `.${Array.from(current.classList).slice(0, 2).join(".")}` : "",
    ].join("");
    parts.unshift(label);
    current = current.parentElement;
  }
  return parts.join(" > ");
}
