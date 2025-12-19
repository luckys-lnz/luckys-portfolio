"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Experience = {
  title: string;
  company: string;
  date: string;
  location: string;
  description: string[];
  url: string;
};

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const experiences: Experience[] = [
    {
      title: "Software Engineer",
      company: "Freelance",
      date: "Jan 2024 — Present",
      location: "Remote",
      description: [
        "Designed and shipped production-ready web applications using React and Next.js, leveraging SSR and SSG for performance and SEO.",
        "Built complex, reusable UI components with Tailwind CSS, ensuring accessibility and mobile-first responsiveness.",
        "Integrated REST APIs and third-party services including authentication, payments, and analytics.",
        "Delivered custom CMS-based solutions using Webflow and WordPress, tailored to client business needs.",
      ],
      url: "https://www.luckyarchibong.com",
    },
    {
      title: "Software Engineering Trainee",
      company: "ALX Africa",
      date: "Jan 2024 — Feb 2025",
      location: "Remote",
      description: [
        "Configured and maintained Linux-based web servers, focusing on reliability and performance.",
        "Implemented HAProxy for load balancing and traffic distribution.",
        "Automated infrastructure tasks using Puppet, improving deployment consistency.",
        "Monitored systems with Datadog and debugged production issues in real time.",
        "Built a full-stack Airbnb clone using Python, Flask, SQLAlchemy, and MySQL.",
        "Collaborated in distributed teams using GitHub, following code review and version control best practices.",
      ],
      url: "https://www.alxafrica.com",
    },
    {
      title: "Web Developer",
      company: "TheDevBuild",
      date: "Jan 2023 — Feb 2024",
      location: "Remote",
      description: [
        "Built and maintained client websites using modern HTML, CSS, and JavaScript.",
        "Implemented responsive layouts across mobile, tablet, and desktop.",
        "Contributed to the development of a shared internal design system.",
        "Worked within agile workflows, participating in sprint planning and reviews.",
      ],
      url: "https://www.thedevbuild.com",
    },
    {
      title: "Web Developer",
      company: "Motito",
      date: "Aug 2021 — Mar 2022",
      location: "Remote",
      description: [
        "Developed responsive web applications with a focus on performance and usability.",
        "Implemented CI/CD pipelines, reducing deployment time by ~40%.",
        "Optimized application performance, improving load times by ~45%.",
        "Built an internal analytics dashboard integrating SQL, BigQuery, and Retool.",
        "Collaborated cross-functionally to deliver features aligned with business goals.",
      ],
      url: "https://motito.co",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section header */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold flex items-center gap-4 mb-14"
          >
            <span className="text-primary font-mono text-xl">02.</span>
            Experience
            <div className="h-px bg-border flex-grow opacity-50" />
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6"
          >
            {/* Company tabs */}
            <div className="md:w-64 md:border-l border-border flex md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "px-4 py-3 text-left font-mono text-sm whitespace-nowrap transition-colors duration-200",
                    activeTab === index
                      ? "text-primary bg-primary/5 md:border-l-2 md:border-primary md:-ml-[2px]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            {/* Experience content */}
            <div className="flex-1 min-h-[340px]">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={cn(
                    "space-y-5",
                    activeTab === index ? "block" : "hidden"
                  )}
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {exp.title}{" "}
                      <span className="text-muted-foreground">@</span>{" "}
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                      >
                        {exp.company}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm font-mono text-muted-foreground">
                      {exp.date} · {exp.location}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground">
                        <span className="text-primary flex-shrink-0">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
