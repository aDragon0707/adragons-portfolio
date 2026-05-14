import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        techBlue: "#3B82F6",
        slateDeep: "#0B0F14",
      },
      boxShadow: {
        tech: "0 0 0 1px rgba(59,130,246,0.25), 0 8px 30px rgba(0,0,0,0.35)",
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#d4d4d4",
            "--tw-prose-headings": "#f5f5f5",
            "--tw-prose-links": "#3B82F6",
            "--tw-prose-code": "#e2e8f0",
            "--tw-prose-pre-bg": "#0d1117",
            "--tw-prose-pre-code": "#d4d4d4",
            "--tw-prose-quotes": "#a1a1aa",
            "--tw-prose-quote-borders": "#3f3f46",
            "--tw-prose-counters": "#71717a",
            "--tw-prose-bullets": "#52525b",
            "--tw-prose-hr": "#27272a",
            "--tw-prose-th-borders": "#3f3f46",
            "--tw-prose-td-borders": "#27272a",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
