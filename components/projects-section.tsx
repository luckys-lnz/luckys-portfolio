"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github, Folder } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
};

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Project Data
  const projects: Project[] = [
    {
      title: "Book & Pay GH",
      description:
        "Book & Pay GH is a SaaS platform that helps local service-based businesses in Ghana manage bookings, payments all in one simple web app.",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      image: "/bookandpay.png",
      github: "https://github.com/luckys-lnz/book-and-payGH",
      demo: "https://bookandpaygh.com",
      featured: true,
    },
    {
      title: "Task Master",
      description:
        "A simple and efficient Todo Manager to track tasks, set deadlines, and prioritize. Perfect for boosting productivity.",
      tags: [
        "NextJs",
        "PostgreSql",
        "Drizle ORM",
        "Tailwind CSS",
        "DnD Kit",
        "Clerk auth",
      ],
      image: "/taskmaster.png",
      demo: "https://task-master-quick.vercel.app/",
      github: "https://github.com/luckys-lnz/task-master",
      featured: true,
    },
    {
      title: "BitNest",
      description:
        "An Agency website showcasing services, portfolio, and client testimonials with a clean and modern design. Built with Next.js and Tailwind CSS.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      image: "/Bitnest.png",
      github: "https://github.com/luckys-lnz/BitNest",
      demo: "https://bitnest.vercel.app/",
      featured: true,
    },
    {
      title: "Krystal12",
      description:
        "A concept design for an oil and gas company website, The site contains static Data and not fully implemented.",
      tags: ["React", "TypeScript", "Node.js", "MongoDB", "Chart.js"],
      image: "/k12.png",
      github: "https://github.com/luckys-lnz/krystal",
      demo: "https://krystal-phi.vercel.app/",
      featured: true,
    },
    {
      title: "Web Scraper",
      description:
        "A multithreaded web crawler in C/Python/TS with Redis deduplication, libxml2 parsing, and Postgres/disk storage.",
      tags: ["C", "Python", "TS", "Postgresql", "Redis", "libxml2"],
      image: "/placeholder.svg",
      github: "https://github.com/luckys-lnz/web-scraper/tree/main/web-scraper",
      featured: false,
    },
    {
      title: "LuDa_chat_app_v1",
      description:
        "LuDa chat application is a real-time chat application where users can join different rooms and exchange messages. This project will enhance understanding of WebSocket communication.",
      tags: ["JS", "Postgresql", "Redis", "CSS", "Node.js", "WebSocket"],
      image: "/placeholder.svg",
      github: "https://github.com/luckys-lnz/LuDa_chat_app_v1",
      featured: false,
    },
    {
      title: "SavePals",
      description:
        "SavePals is a collaborative savings platform that allows friends to save money together by setting group goals, tracking progress, and managing contributions. Built with Flask, the application provides a streamlined and user-friendly interface for managing group savings plans, making financial collaboration easier and more transparent.",
      tags: ["Python", "JS", "Postgresql", "Redis", "Flask", "CSS"],
      image: "/placeholder.svg",
      github: "https://github.com/luckys-lnz/SavePals",
      featured: false,
    },
    {
      title: "Airbnb Clone",
      description:
        "Full-stack Airbnb clone with user auth, listings, and booking using Python, Flask, MySQL, and JS.",
      tags: ["Python", "Flask", "MySQL", "RestAPI", "JS", "SCSS"],
      image: "/placeholder.svg",
      github: "https://github.com/luckys-lnz/AirBnB_clone_v4",
      featured: false,
    },
    {
      title: "NVIM Config",
      description:
        "A highly customized Neovim configuration focused on performance and usability, featuring LSP, autocompletion, and Git integration.",
      tags: ["Lua", "Neovim", "LSP", "Treesitter", "Git"],
      image: "/placeholder.svg",
      github: "https://github.com/luckys-lnz/nvim",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

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
    <section id="projects" className="py-20 md:py-32">
      {" "}
      <div className="container max-w-screen-lg">
        {" "}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full"
        >
          {/* Section Header */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold flex items-center gap-4 mb-12 md:mb-16"
          >
            <span className="text-primary font-mono text-lg md:text-xl">
              03.
            </span>
            Some Things I've Built
            <div className="h-px bg-border flex-grow ml-4 opacity-30 dark:opacity-50"></div>
          </motion.h2>

          {/* Featured Projects List */}
          <div className="space-y-20 md:space-y-28">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center"
              >
                {/* Project Image Container */}
                <div
                  className={`relative md:col-span-7 group ${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <Link
                    href={project.demo || project.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo or repository`}
                    className="block rounded-md overflow-hidden shadow-lg "
                  >
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-primary/30 dark:bg-primary/40 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      width={600}
                      height={375}
                      className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 grayscale-0 hover:grayscale-0 md:grayscale group-hover:grayscale-0" // Added grayscale effect like Brittany's
                    />
                  </Link>
                </div>
                {/* Project Content Container */}
                <div
                  className={`relative md:col-span-5 z-10 ${
                    // Span 5 columns
                    index % 2 === 0
                      ? "md:order-1 md:text-left"
                      : "md:order-2 md:text-right"
                  } mt-4 md:mt-0`}
                >
                  <p className="text-primary font-mono text-sm mb-1">
                    Featured Project
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 dark:hover:text-primary hover:text-primary transition-colors">
                    <Link
                      href={project.demo || project.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  {/* Description Box */}
                  <div className="bg-card md:bg-slate-100 md:dark:bg-slate-800 rounded-md shadow-md p-4 md:p-6 mb-4 transition-shadow hover:shadow-lg">
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {project.description}
                    </p>
                  </div>
                  {/* Tags List */}
                  <ul
                    className={`flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 mb-6 ${
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {/* Links */}
                  <div
                    className={`flex gap-3 ${
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="text-slate-500 hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className="text-slate-500 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Other Projects Section Header */}
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-center mt-24 md:mt-32 mb-8 md:mb-12 text-slate-800 dark:text-slate-100"
          >
            Other Noteworthy Projects
          </motion.h3>
          <motion.h4
            variants={itemVariants}
            className="text-sm text-center mb-12 md:mb-16"
          >
            <Link
              href="https://github.com/luckys-lnz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-slate-800 dark:text-slate-100 hover:text-primary dark:hover:text-primary font-mono"
            >
              Browse My Github
            </Link>
          </motion.h4>
          {/* Other Projects Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {otherProjects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                {/* Project Card */}
                <div className="h-full group relative">
                  <Link
                    href={project.demo || project.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`View project ${project.title}`}
                  />
                  <Card className="h-full bg-card dark:bg-slate-800/80 group hover:bg-slate-100/80 dark:hover:bg-slate-700/80 hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl border border-transparent hover:border-primary/30 flex flex-col">
                    <CardContent className="p-5 md:p-6 flex flex-col flex-grow">
                      {/* Card Header: Icons */}
                      <div className="flex justify-between items-center mb-6">
                        <Folder className="h-8 w-8 text-primary" />{" "}
                        {/* Folder Icon */}
                        <div className="flex gap-2 z-20">
                          {" "}
                          {/* Ensure links are clickable above overlay link */}
                          {project.github && (
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-500 hover:text-primary transition-colors p-1"
                              aria-label="GitHub Repository"
                            >
                              <Github className="h-5 w-5" />
                            </Link>
                          )}
                          {project.demo && (
                            <Link
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-500 hover:text-primary transition-colors p-1"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-5 w-5" />{" "}
                            </Link>
                          )}
                        </div>
                      </div>
                      {/* Card Title */}
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {project.description}
                      </p>
                      {/* Card Footer: Tags */}
                      <div className="mt-auto">
                        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                          {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
