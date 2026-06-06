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
  title: "Avashya | Measure, Govern & Optimize AI Agents in Your Engineering Org",
  description: "The command center for AI-assisted engineering. Track agent effectiveness, compare teams, and get actionable recommendations to maximize ROI from Claude Code, Copilot, and Cursor.",
  keywords: ["AI Agent Governance", "Coding Agent Optimization", "Engineering Effectiveness", "AI Observability", "Agent Management Platform"],
  authors: [{ name: "Avashya" }],
  openGraph: {
    title: "Avashya | The Command Center for AI-Assisted Engineering",
    description: "Measure, govern, and optimize every AI agent in your engineering org.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('avashya-theme');if(t)document.documentElement.setAttribute('data-theme',t)})()` }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
