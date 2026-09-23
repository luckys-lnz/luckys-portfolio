"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "SQL",
    "Tailwind CSS",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold flex items-center gap-4 mb-12">
              <span className="text-primary font-mono text-xl">01.</span>
              About Me
              <div className="h-px bg-border flex-grow opacity-50"></div>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <motion.div
              variants={itemVariants}
              className="md:col-span-7 space-y-5"
            >
              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
                I'm a software engineer who builds products for businesses. I
                enjoy understanding how people work before writing code, then
                designing software that simplifies operations, automates
                repetitive work, and scales reliably.
              </p>
              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
                Most of my work is around production-ready web applications,
                backend systems, payment integrations, and AI-powered tools that
                solve practical business problems.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="md:col-span-5 border-l-2 border-primary pl-6 md:pl-8"
            >
              <p className="mb-5 font-mono text-sm text-primary">
                Current stack focus
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm font-mono text-muted-foreground">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
