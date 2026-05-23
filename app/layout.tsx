import type { Metadata } from "next";
import "./globals.css";

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
    <html>
      <body className="text-[color:var(--ink)] antialiased selection:bg-[color:oklch(0.8_0.11_70_/_0.35)] selection:text-[color:var(--ink)]">
        {children}
      </body>
    </html>
  );
}
