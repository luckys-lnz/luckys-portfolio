"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "TypeScript",
    "JavaScript (ES6+)",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Git",
    "Docker",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container max-w-screen-lg mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-5 gap-12 items-start"
        >
          {/* Text content */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-6">
            {/* Section heading */}
            <h2 className="text-3xl font-bold flex items-center gap-4">
              <span className="text-primary font-mono text-xl">01.</span>
              About Me
              <div className="flex-grow h-px bg-border opacity-50"></div>
            </h2>

            {/* About paragraphs */}
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                I’m a software engineer focused on building reliable, scalable systems. I
                design clean architectures, write maintainable code, and turn ambiguous
                problems into production-ready solutions.
              </p>
              <p>
                I care about correctness, simplicity, and long-term maintainability. I
                make deliberate trade-offs, document decisions, and optimize for systems
                that are easy to evolve, not quick hacks.
              </p>
              <p>
                My work spans backend systems, APIs, and user-facing features. I enjoy
                owning problems end-to-end—from system design to deployment—and measure
                success by real-world performance.
              </p>
              <p>Technologies I work with regularly include:</p>
            </div>

            {/* Skills grid */}
            <motion.ul
              variants={itemVariants}
              className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4 text-sm md:text-base"
            >
              {skills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-primary font-bold">▹</span> {skill}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Image content */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 relative flex justify-center md:justify-end"
          >
            <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-800 transition-all duration-300 group hover:border-primary/50">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-300 z-10"></div>
              <Image
                src="/lucky.A.jpg"
                alt="Lucky Archibong"
                width={600}
                height={600}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute -inset-1.5 rounded-lg bg-primary/10 -z-10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
