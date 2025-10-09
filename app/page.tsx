import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Lucky Archibong - Mobile & Web Developer | Full-Stack Software Engineer Portfolio",
  description:
    "Lucky Archibong is a mobile and web developer offering custom app development services. Specializing in React, TypeScript, Next.js, React Native, and cross-platform applications. Full-stack software engineer portfolio.",
  keywords: [
    "Lucky Archibong",
    "Lucky Archibong developer",
    "Lucky Archibong software engineer",
    "Lucky Archibong mobile developer",
    "Lucky Archibong web developer",
    "Lucky Archibong portfolio",
    "Lucky Archibong React",
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
    "custom mobile app development",
    "custom web app development",
    "Full-Stack Developer",
    "Software Engineer Portfolio",
    "Web Developer",
    "Mobile Developer",
    "React Developer",
    "Next.js Developer",
  ],
  openGraph: {
    title: "Lucky Archibong - Mobile & Web Developer Portfolio",
    description:
      "Mobile and web developer specializing in React, TypeScript, Next.js, and React Native. Offering custom mobile app development and web development services.",
    url: "https://luckyarchibong.vercel.app",
    type: "website",
  },
  twitter: {
    title: "Lucky Archibong - Mobile & Web Developer Portfolio",
    description:
      "Mobile and web developer offering custom app development services. Specializing in React, TypeScript, Next.js, and React Native.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
