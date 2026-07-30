"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
    "Docker",
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

          {/* Content Grid */}
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <motion.div
  variants={itemVariants}
  className="md:col-span-7 space-y-6"
>
  <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
    <p>
      I'm a software engineer who builds products for businesses. I enjoy
      understanding how people work before writing code, then designing
      software that simplifies operations, automates repetitive work, and
      scales reliably.
    </p>

    <p>
      Most of my work is around building production-ready web applications,
      backend systems, payment integrations, and AI-powered tools that solve
      practical business problems.
    </p>

    <p>Current stack focus:</p>
  </div>

  <ul className="grid grid-cols-2 gap-2 text-sm font-mono">
    {skills.map((skill, idx) => (
      <li key={idx} className="flex items-center gap-2 group">
        <span className="text-primary group-hover:translate-x-1 transition-transform">
          ▹
        </span>
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
