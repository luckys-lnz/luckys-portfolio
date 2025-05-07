import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { Mona_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Lucky Archibong | Software Engineer",
  description: "I am a software engineer with a passion for building web applications.",
  keywords: "software engineer, web developer, lucky archibong",
  authors: [{ name: "Lucky Archibong", url: "https://luckyarchibong.com" }],
  creator: "Lucky Archibong",
  publisher: "Lucky Archibong",
  openGraph: {
    title: "Lucky Archibong | Software Engineer",
    description: "I am a software engineer with a passion for building web applications.",
    url: "https://luckyarchibong.com",
    siteName: "Lucky Archibong | Software Engineer",
    images: [
      {
        url: "https://luckyarchibong.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lucky Archibong | Software Engineer",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Archibong | Software Engineer",
    description: "I am a software engineer with a passion for building web applications.",
    images: ["https://luckyarchibong.com/images/og-image.png"],
    creator: "@luckyarchibong",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
