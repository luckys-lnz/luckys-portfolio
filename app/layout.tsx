import React from "react";
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Mona_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Lucky Archibong",
    "Lucky Archibong portfolio",
    "Lucky Archibong software engineer",
    "full-stack software engineer",
    "backend engineer",
    "web developer",
    "mobile developer",
    "TypeScript developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "Python developer",
    "payment infrastructure",
    "luckys-lnz",
    "livinginpixel",
  ],
  category: "technology",
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: `${siteConfig.name} Portfolio`,
    type: "profile",
    firstName: "Lucky",
    lastName: "Archibong",
    username: "luckys-lnz",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  other: {
    "msapplication-TileColor": "#3b5ace",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  width: "device-width",
  initialScale: 1,
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
        "@id": `${siteConfig.url}/#website`,
        name: `${siteConfig.name} Portfolio`,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        givenName: "Lucky",
        familyName: "Archibong",
        alternateName: ["luckys-lnz", "livinginpixel"],
        url: siteConfig.url,
        email: `mailto:${siteConfig.email}`,
        image: `${siteConfig.url}/opengraph-image`,
        jobTitle: "Software Engineer",
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Accra Institute of Technology" },
        ],
        description: siteConfig.description,
        sameAs: Object.values(siteConfig.socials),
        knowsAbout: [
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Python",
          "PostgreSQL",
          "Backend Systems",
          "Payment Infrastructure",
          "Full-Stack Development",
          "Software Engineering",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Engineer",
          skills:
            "TypeScript, React, Next.js, Node.js, Python, PostgreSQL, Tailwind CSS",
        },
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
          <SiteHeader />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
