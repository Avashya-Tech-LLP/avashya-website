import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Avashya | Coding Agent Optimization & AI Governance",
  description: "Transform AI coding assistants into measurable productivity multipliers. Optimize context management, orchestrate team agents, and ship with confidence.",
  keywords: ["AI Governance", "Coding Agent Optimization", "Engineering Effectiveness", "AIDLC", "Agent Orchestration"],
  authors: [{ name: "Avashya" }],
  openGraph: {
    title: "Avashya | Maximize Engineering Velocity with Agentic Optimization",
    description: "The Avashya Intelligence Platform - Enterprise AI governance and coding agent optimization",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
