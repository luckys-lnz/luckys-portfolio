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
                My journey into software engineering was not linear, but it is one
                I am proud of. I studied Computer Science in school, and while I
                did particularly well in C programming, I initially had
                different plans; I was drawn to the world of trade and
                entrepreneurship.
              </p>
              <p>
                Then the world hit pause during the COVID-19 pandemic. With time
                on my hands and the world on lockdown, I found myself revisiting
                programming; just to stay sharp and curious. That casual
                exploration slowly reignited a spark.
              </p>
              <p>
                Over the next few years, I bounced between interests, but coding
                kept pulling me back. In 2023, I made the decision to fully
                commit to software engineering, and I haven't looked back since.
                Today, I am passionate about building clean, accessible, and
                user-focused digital products that blend creativity with logic.
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
