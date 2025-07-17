"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Add ref to store timeout for scroll to section
  // This is to prevent multiple scroll events from firing at once
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const sections = navLinks.map((link) =>
        document.querySelector(link.href)
      );

      let currentSection = "";

      for (const section of sections) {
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top < window.innerHeight / 2) {
            currentSection = `#${section.id}`;
          }
        }
      }

      if (scrollY < 100) {
        setActiveSection("/");
      } else if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop - 80,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md overflow-visible",
        isScrolled
          ? "bg-background/80 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container md:max-w-screen-lg flex h-16 items-center justify-between relative">
        {/* Logo with hover animation */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/"
            onClick={() => setActiveSection("/")}
            className="flex items-centernp"
            aria-label="Lucky Archibong"
            title="Lucky Archibong"
          >
            <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "relative inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-primary transition-colors",
                activeSection === link.href && "text-primary"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <span>{link.label}</span>

              {activeSection === link.href && link.href !== "/" && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.3,
                  }}
                />
              )}
            </motion.button>
          ))}

          {/* Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ThemeToggle />
          </motion.div>
          
          {/* Resume button */}
          <motion.a
            href="/docs/LA.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 0px 10px rgba(255,255,255,0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
              Resume
            </Button>
          </motion.a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <div className="container py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={cn(
                    "justify-start text-base font-mono font-medium flex items-center gap-2",
                    activeSection === link.href && "text-primary"
                  )}
                  onClick={() => scrollToSection(link.href)}
                >
                  <span className="text-primary text-sm">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {link.label}
                </Button>
              ))}
              <motion.a
                href="/docs/LA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                }}
              >
                <Button className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Resume
                </Button>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
