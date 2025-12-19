"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "Python",
    "C",
    "TypeScript",
    "JavaScript (ES6+)",
    "React",
    "Node.js",
    "Angular",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 md:px-20 md:py-32 relative">
      <div className="container max-w-screen-lg relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-5 gap-10 items-start"
        >
          <motion.div variants={itemVariants} className="md:col-span-3">
            <h2 className="text-3xl font-bold flex items-center gap-4 mb-8">
              <span className="text-primary font-mono text-xl">01.</span>
              About Me
              <div className="h-px bg-border flex-grow ml-4 opacity-50"></div>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I’m a software engineer focused on building reliable, scalable
                systems. I spend most of my time designing clean architectures,
                writing maintainable code, and turning ambiguous problems into
                production-ready solutions.
              </p>
              <p>
                I care deeply about correctness, simplicity, and long-term
                maintainability. I make deliberate trade-offs, document
                decisions, and optimize for systems that are easy to evolve
                rather than quick to hack together.
              </p>
              <p>
                My work spans backend systems, APIs, and product-facing
                features. I enjoy owning problems end-to-end, from system design
                to deployment, and I judge success by how well the software
                performs in real-world use.
              </p>
              <p>
                Theses are some of the technologies I have been working with
                recently:
              </p>
            </div>

            <motion.ul
              variants={itemVariants}
              className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 text-sm"
            >
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">▹</span> {skill}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-2 relative group"
          >
            <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-800 transition-all duration-300 group-hover:border-primary/50">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-300 z-10"></div>
              <Image
                src="/lucky.A.jpg?height=200&width=400"
                alt="Lucky Archibong"
                width={600}
                height={600}
                className="rounded-lg transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute -inset-1.5 rounded-lg bg-primary/10 -z-10 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
