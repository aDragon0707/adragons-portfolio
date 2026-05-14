import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { canUseOwnerApi } from "@/lib/owner-mode";

// ─── Path helpers ─────────────────────────────────────────────────────────────

const ZH_DIR = path.join(process.cwd(), "posts", "zh");
const EN_DIR = path.join(process.cwd(), "posts", "en");

function getDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function buildFrontmatter(title: string, date: string): string {
  const escaped = title.replace(/"/g, '\\"');
  return `---\ntitle: "${escaped}"\ndate: "${date}"\n---\n\n`;
}

// ─── LLM Translation ──────────────────────────────────────────────────────────

interface TranslationResult {
  title: string;
  content: string;
}

/**
 * Translates a Chinese Markdown post into native English using an
 * OpenAI-compatible chat completions endpoint.
 *
 * Configure via environment variables:
 *   OPENAI_API_KEY   — required (also used as DEEPSEEK_API_KEY if set)
 *   OPENAI_BASE_URL  — optional, defaults to OpenAI; set to DeepSeek base URL to use that provider
 *   TRANSLATION_MODEL — optional model override (default: "gpt-4o-mini")
 */
async function translateToEnglish(
  zhTitle: string,
  zhContent: string
): Promise<TranslationResult> {
  const apiKey =
    process.env.OPENAI_API_KEY ?? process.env.DEEPSEEK_API_KEY ?? "";

  if (!apiKey) {
    throw new Error(
      "No API key found. Set OPENAI_API_KEY or DEEPSEEK_API_KEY in .env.local"
    );
  }

  const baseUrl =
    (process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(
      /\/$/,
      ""
    );
  const model = process.env.TRANSLATION_MODEL ?? "gpt-4o-mini";

  const systemPrompt = `You are a precise technical translation engine specialized in developer documentation.
Your sole task is to translate Chinese Markdown blog posts into native, developer-friendly English.

STRICT RULES — never break these:
1. Preserve ALL Markdown formatting exactly: headings (#, ##, ###), bold (**), italic (*), horizontal rules (---), lists (-, *), blockquotes (>).
2. Preserve ALL code blocks verbatim — do NOT translate code, variable names, comments inside code blocks, or inline code.
3. Translate ONLY natural-language prose: paragraphs, headings text, list item text, blockquote text, table cell text.
4. Output ONLY a JSON object with exactly two keys:
   - "title": the translated English title (string)
   - "content": the translated English Markdown body WITHOUT any frontmatter (string)
5. Do NOT wrap the JSON in markdown fences. Do NOT add any commentary outside the JSON.`;

  const userPrompt = `Chinese Title: ${zhTitle}

Chinese Markdown Body (no frontmatter):
${zhContent}`;

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`LLM API error ${response.status}: ${text}`);
  }

  const json = await response.json();
  const raw: string = json.choices?.[0]?.message?.content ?? "{}";

  let parsed: Partial<TranslationResult>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`LLM returned invalid JSON: ${raw.slice(0, 200)}`);
  }

  if (!parsed.title?.trim() || !parsed.content?.trim()) {
    throw new Error("LLM returned an incomplete translation (missing title or content)");
  }

  return { title: parsed.title.trim(), content: parsed.content.trim() };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!canUseOwnerApi(req)) {
    return NextResponse.json(
      { error: "Owner mode required" },
      { status: 403 }
    );
  }

  let title: string;
  let content: string;

  try {
    ({ title, content } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!content?.trim()) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const zhTitle = title.trim();
  const zhContent = content.trim();
  const date = getDateString();

  // ── Step 1: Translate ────────────────────────────────────────────────────────
  let enTitle: string;
  let enContent: string;

  try {
    ({ title: enTitle, content: enContent } = await translateToEnglish(
      zhTitle,
      zhContent
    ));
  } catch (err) {
    console.error("[save-post] translation failed:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? `Translation failed: ${err.message}`
            : "Translation failed (unknown error)",
      },
      { status: 502 }
    );
  }

  // ── Step 2: Build filename from the translated English title ─────────────────
  const rawSlug = toSlug(enTitle) || Date.now().toString();
  const filename = `${date}-${rawSlug}.md`;

  // ── Step 3: Write both files ─────────────────────────────────────────────────
  try {
    await fs.promises.mkdir(ZH_DIR, { recursive: true });
    await fs.promises.mkdir(EN_DIR, { recursive: true });

    const zhFileContent =
      buildFrontmatter(zhTitle, date) + zhContent + "\n";
    const enFileContent =
      buildFrontmatter(enTitle, date) + enContent + "\n";

    await Promise.all([
      fs.promises.writeFile(path.join(ZH_DIR, filename), zhFileContent, "utf-8"),
      fs.promises.writeFile(path.join(EN_DIR, filename), enFileContent, "utf-8"),
    ]);
  } catch (err) {
    console.error("[save-post] fs write failed:", err);
    return NextResponse.json(
      { error: "Failed to write files to disk" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { ok: true, zhFilename: filename, enFilename: filename },
    { status: 200 }
  );
}
