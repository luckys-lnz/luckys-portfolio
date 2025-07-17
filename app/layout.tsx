import React from "react";
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
  metadataBase: new URL("https://luckyarchi.tech"),
  title: {
    default: "Lucky Archibong | Full-Stack Software Engineer & UI/UX Designer",
    template: "%s | Lucky Archibong",
  },
  description:
    "Full-stack software engineer specializing in mobile and web applications.",
  keywords: [
    "Lucky Archibong",
    "Full-Stack Software Engineer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Portfolio",
    "Web Applications",
    "Software Development",
    "lnz",
    "luckys-lnz",
  ],
  category: "technology",
  applicationName: "Lucky Archibong Portfolio",
  authors: [{ name: "Lucky Archibong", url: "https://luckyarchi.tech" }],
  creator: "Lucky Archibong",
  publisher: "Lucky Archibong",
  alternates: {
    canonical: "https://luckyarchi.tech",
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
  title: "Lucky Archibong | Expert Full-Stack Software Engineer & UI/UX Designer",
  description:
    "Discover Lucky <Archibong></Archibong>’s innovative portfolio showcasing full-stack web development projects built with React, TypeScript, Next.js, and modern web technologies.",
  url: "https://luckyarchi.tech",
  siteName: "Lucky Archibong Portfolio",
  type: "website",
  locale: "en-US",
  images: [
    {
      url: "https://luckyarchi.tech/images/og-image.png",
      width: 1200,
      height: 630,
      alt: "Lucky Archibong’s portfolio showcasing full-stack development and UI/UX design",
      type: "image/png",
    },
  ],
},

  twitter: {
    card: "summary_large_image",
    title: "Lucky Archibong | Full-Stack Software Engineer & UI/UX Designer",
    description:
      "Developer portfolio featuring web apps and UI/UX designs built with React, TypeScript, and Next.js. By Lucky Archibong.",
    creator: "@luckys_lens",
    images: ["https://luckyarchi.tech/images/og-image.png"],
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
