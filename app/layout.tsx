import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const notoSansSc = Noto_Sans_SC({
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-sc",
  weight: ["400", "500", "600", "700", "800"],
});

const notoSerifSc = Noto_Serif_SC({
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-sc",
  weight: ["500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ADRAGON | AI Solo Company OS",
  description:
    "A dark technical brand for agent receipts, evidence-led workflows, and solo-company systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${notoSansSc.variable} ${notoSerifSc.variable} ${sourceSerif.variable}`}
    >
      <body
        className="text-[color:var(--ink)] antialiased selection:bg-[color:oklch(0.8_0.11_70_/_0.35)] selection:text-[color:var(--ink)]"
      >
        {children}
      </body>
    </html>
  );
}
