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
  metadataBase: new URL("https://luckyarchibong.vercel.app"),
  title: {
    default:
      "Lucky Archibong | Mobile & Web Developer | Full-Stack Software Engineer",
    template: "%s | Lucky Archibong",
  },
  description:
    "Lucky Archibong is a mobile and web developer specializing in React, TypeScript, Next.js, and cross-platform applications. Full-stack software engineer offering mobile app development and web development services.",
  keywords: [
    "Lucky Archibong",
    "Lucky Archibong developer",
    "Lucky Archibong software engineer",
    "Lucky Archibong mobile developer",
    "Lucky Archibong web developer",
    "Lucky Archibong portfolio",
    "Lucky Archibong React developer",
    "Lucky Archibong Next.js",
    "Lucky Archibong TypeScript",
    "mobile app developer",
    "web app developer",
    "mobile and web developer",
    "cross-platform developer",
    "React Native developer",
    "mobile development services",
    "web development services",
    "app development",
    "mobile application developer",
    "web application developer",
    "Full-Stack Software Engineer",
    "UI/UX Designer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Mobile Developer",
    "Portfolio",
    "Web Applications",
    "Mobile Applications",
    "Software Development",
    "lnz",
    "luckys-lnz",
    "luckys lens",
    "lucky archibong github",
    "lucky archibong linkedin",
  ],
  category: "technology",
  applicationName: "Lucky Archibong Portfolio",
  authors: [
    { name: "Lucky Archibong", url: "https://luckyarchibong.vercel.app" },
  ],
  creator: "Lucky Archibong",
  publisher: "Lucky Archibong",
  alternates: {
    canonical: "https://luckyarchibong.vercel.app",
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
    // If an Apple touch icon is added later, update this path
    apple: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title:
      "Lucky Archibong | Mobile & Web Developer | Full-Stack Software Engineer",
    description:
      "Mobile and web developer specializing in React, TypeScript, Next.js, and cross-platform applications. Full-stack software engineer offering mobile app development and web development services.",
    url: "https://luckyarchibong.vercel.app",
    siteName: "Lucky Archibong Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/lucky.A.jpg",
        width: 1200,
        height: 630,
        alt: "Lucky Archibong – Mobile & Web Developer",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Lucky Archibong | Mobile & Web Developer | Full-Stack Software Engineer",
    description:
      "Mobile and web developer offering app development services. Specializing in React, TypeScript, Next.js, and cross-platform applications. By Lucky Archibong.",
    creator: "@luckys_lens",
    images: ["/lucky.A.jpg"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Lucky Archibong Portfolio",
        url: "https://luckyarchibong.vercel.app",
        description:
          "Lucky Archibong is a mobile and web developer specializing in React, TypeScript, Next.js, and cross-platform applications. Full-stack software engineer offering mobile app development and web development services.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://luckyarchibong.vercel.app/#person",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://luckyarchibong.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@id": "https://luckyarchibong.vercel.app/#person",
        "@type": "Person",
        name: "Lucky Archibong",
        alternateName: ["luckys-lnz", "luckys lens"],
        url: "https://luckyarchibong.vercel.app",
        jobTitle: "Mobile & Web Developer",
        description:
          "Mobile and web developer specializing in React, TypeScript, Next.js, and cross-platform applications. Full-stack software engineer offering mobile app development and web development services.",
        image: {
          "@type": "ImageObject",
          url: "https://luckyarchibong.vercel.app/lucky.A.jpg",
          caption: "Lucky Archibong - Full-Stack Software Engineer",
        },
        sameAs: [
          "https://github.com/luckys-lnz",
          "https://www.linkedin.com/in/lucky-archibong/",
          "https://twitter.com/luckys_lens",
        ],
        knowsAbout: [
          "React",
          "TypeScript",
          "Next.js",
          "React Native",
          "Mobile Development",
          "Web Development",
          "Cross-Platform Development",
          "Mobile App Development",
          "Web App Development",
          "Full-Stack Development",
          "UI/UX Design",
          "Software Engineering",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Mobile & Web Developer",
          description:
            "Mobile and web developer specializing in React, TypeScript, Next.js, and cross-platform applications",
        },
        offers: [
          {
            "@type": "Service",
            name: "Mobile App Development",
            description:
              "Custom mobile application development using React Native and modern technologies",
          },
          {
            "@type": "Service",
            name: "Web Development",
            description:
              "Full-stack web application development using React, TypeScript, and Next.js",
          },
          {
            "@type": "Service",
            name: "Cross-Platform Development",
            description:
              "Cross-platform mobile and web applications for multiple devices",
          },
        ],
      },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
