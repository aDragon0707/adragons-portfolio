import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADRAGON | AI Solo Company OS",
  description:
    "A personal technology portfolio for AI solo-company systems, agent audit protocols, learning tools, evidence-led workflows, and solo-builder leverage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="text-[color:var(--ink)] antialiased selection:bg-[color:oklch(0.88_0.05_250)]">
        {children}
      </body>
    </html>
  );
}
