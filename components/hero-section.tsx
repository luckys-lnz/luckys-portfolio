"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-slate-400/20 dark:bg-slate-300/10 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-screen-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-4 max-w-3xl"
        >
          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary font-mono text-sm md:text-base"
          >
            Hi, I’m
          </motion.p>

          {/* Name - dominant */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            Lucky Archibong
          </motion.h1>

          {/* Value statement - supporting */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
            className="text-2xl md:text-3xl font-semibold text-muted-foreground mt-2"
          >
            I build <span className="text-primary">scalable web applications</span> that solve real problems.
          </motion.h2>

          {/* Technical about me */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mt-4"
          >
            Software Engineer specializing in full-stack development, clean architecture, and user-focused digital products. I turn ideas into reliable, maintainable software that scales.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Button
              size="lg"
              className="group"
              onClick={() => {
                const element = document.querySelector("#projects");
                if (element) {
                  const offsetTop =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: offsetTop - 80, behavior: "smooth" });
                }
              }}
            >
              View my work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  const offsetTop =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: offsetTop - 80, behavior: "smooth" });
                }
              }}
            >
              Get in touch
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center gap-4 mt-8"
          >
            <Link
              href="https://github.com/luckys-lnz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/lucky-archibong/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://x.com/luckys_lens"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
