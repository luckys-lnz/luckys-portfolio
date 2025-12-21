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
          className="grid md:grid-cols-12 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-7 space-y-6"
          >
            <h2 className="text-3xl font-bold flex items-center gap-4">
              <span className="text-primary font-mono text-xl">01.</span>
              About Me
              <div className="h-px bg-border flex-grow opacity-50"></div>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I am a software engineer focused on{" "}
                <span className="text-foreground font-medium border-b-2 border-primary/30">
                  Solving real-world problems
                </span>
                . I specialize in clean architecture and turning complex
                technical challenges into production-ready solutions.
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

          {/* Image Content */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-[320px]">
              {/* Outer Decorative Border */}
              <div className="absolute -inset-3 border border-primary/20 rounded-xl -z-10 group-hover:inset-0 transition-all duration-500" />

              {/* Image Container with Accent Tint */}
              <div className="relative rounded-lg overflow-hidden aspect-square bg-primary shadow-2xl">
                <Image
                  src="/lucky.A.jpg"
                  alt="Lucky Archibong"
                  fill
                  className="object-cover transition-all duration-500 mix-blend-multiply opacity-90 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-110"
                />
                {/* Subtle Overlay to ensure color matching */}
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
