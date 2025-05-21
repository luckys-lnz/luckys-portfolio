import type React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import { Mona_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luckyarchibong.com"),
  title: {
    default: "Lucky Archibong | Full-Stack Software Engineer",
    template: "%s | Lucky Archibong",
  },
  description:
    "Lucky Archibong is a results-driven full-stack software engineer building performant web applications with modern frameworks like Next.js, React, and TypeScript. Explore high-impact frontend UIs, scalable backend systems, and elegant design implementations.",
  keywords: [
    "Lucky Archibong",
    "Full-Stack Software Engineer",
    "React Developer",
    "Next.js Portfolio",
    "TypeScript Developer",
    "Frontend Engineer",
    "Backend Developer",
    "JavaScript Engineer",
    "Web Developer Portfolio",
    "Software Engineering Projects",
  ],
  category: "technology",
  applicationName: "Lucky Archibong Portfolio",
  authors: [{ name: "Lucky Archibong", url: "https://luckyarchibong.com" }],
  creator: "Lucky Archibong",
  publisher: "Lucky Archibong",
  alternates: {
    canonical: "https://luckyarchibong.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Lucky Archibong | Full-Stack Software Engineer",
    description:
      "Explore Lucky Archibong’s portfolio of full-stack web development projects using React, TypeScript, Next.js, and modern backend tools.",
    url: "https://luckyarchibong.com",
    siteName: "Lucky Archibong",
    type: "website",
    locale: "en-US",
    images: [
      {
        url: "https://luckyarchibong.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lucky Archibong Portfolio Hero Section",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Archibong | Full-Stack Software Engineer",
    description:
      "Discover Lucky Archibong’s developer portfolio featuring scalable web apps built with React, TypeScript, and modern UI/UX design.",
    creator: "@luckys_lens",
    images: ["https://luckyarchibong.com/images/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#3b5ace",
  "apple-mobile-web-app-status-bar-style": "default",
  "apple-mobile-web-app-capable": "yes",
  "mobile-web-app-capable": "yes",
  "msapplication-TileColor": "#3b5ace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
