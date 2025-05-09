"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
      date: "January 2024 - Present",
      location: "Remote",
      description: [
        "Designed and developed multiple responsive web applications using React.js and Next.js, leveraging server-side rendering and static site generation for improved performance and SEO.",
        "Implemented complex UI components with Tailwind CSS, ensuring consistent design and mobile-first responsiveness across devices.",
        "Built dynamic client websites on CMS platforms like Webflow and WordPress, customising themes and integrating third-party APIs to meet client-specific requirements.",
        "Integrated RESTful APIs and third-party services to enhance application functionality, such as payment gateways, authentication, and analytics.",
      ],
      url: "https://www.luckyarchibong.com",
    },
    {
      title: "Software Engineering Trainee",
      company: "ALX-SE Training Program",
      date: "January 2024 - Febuary 2025",
      location: "Remote",
      description: [
        "Set up and maintained Ubuntu web servers, learning how to keep systems reliable and responsive for users.",
        "Implemented HAProxy as a load balancer to help distribute incoming traffic and reduce server overload.",
        "Gained experience with Puppet to automate routine server tasks, improving efficiency and consistency in deployment.",
        "Used Datadog to monitor server health and performance, catching issues early and learning to debug in real time.",
        "Built a full-stack Airbnb clone using Python, Flask, jQuery, and SQLAlchemy, focusing on backend development and how databases connect to user-facing features.",
        "Designed and managed MySQL databases to handle user accounts and property listings, practicing data modeling and relational queries.",
        "Worked closely with peers using GitHub for version control, team collaboration, and code reviews, developing habits for clean, maintainable code.",
      ],
      url: "https://www.alxafrica.com/ ",
    },
    {
      title: "Web Developer",
      company: "TheDevBuild",
      date: "January 2023 - February 2024",
      location: "Remote",
      description: [
        "Built and maintained client websites using HTML, CSS, and JavaScript",
        "Implemented responsive designs that work across all device sizes",
        "Assisted in the development of a company-wide design system",
        "Participated in agile development processes and sprint planning",
      ],
      url: "https://www.thedevbuild.com",
    },
    {
      title: "Web Developer",
      company: "Motito",
      date: "August 2021 - March 2022",
      location: "Remote",
      description: [
        "Developed responsive web applications using HTML/CSS and JavaScript",
        "Implemented CI/CD pipelines that reduced deployment time by 40%",
        "Optimized the company web application performance, improving load times by 45%",
        "Collaborated with cross-functional teams to deliver features on schedule",
        "Built an internal dashboard using JavaScript and SQL, integrating BigQuery data with Retool to visualise and manage user demographic insights.",
        "Worked closely with clients to gather requirements, offer technical guidance, and deliver tailored digital solutions that align with business goals.",
        "Ensured cross-browser compatibility, mobile responsiveness, and SEO best practices in our websites.",
      ],
      url: "https://motito.co/",
    },
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
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="container max-w-4xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold flex items-center gap-4 mb-12"
          >
            <span className="text-primary font-mono text-xl">02.</span>
            Where I've Worked
            <div className="h-px bg-border flex-grow ml-4 opacity-50"></div>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="md:border-l border-border md:w-64 flex md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-hide">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "px-4 py-3 text-left font-mono text-sm whitespace-nowrap transition-all",
                    activeTab === index
                      ? "text-primary border-primary md:border-l-2 md:-ml-[2px] bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {exp.company}
                </button>
              ))}
            </div>

            <div className="flex-1 min-h-[320px]">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={cn(
                    "space-y-4 transition-all duration-300",
                    activeTab === index ? "opacity-100" : "hidden opacity-0"
                  )}
                >
                  <h3 className="text-xl font-medium">
                    {exp.title} @ {""}
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {exp.company}
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {exp.date} | {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground">
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
