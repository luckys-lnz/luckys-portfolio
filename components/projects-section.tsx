"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const projects: Project[] = [
    {
      title: "Developer Portfolio",
      description:
        "A modern portfolio website for developers with dark mode support, animations, and responsive design. Built with Next.js and Tailwind CSS.",
      tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      image: "/Archi-tech.png?height=400&width=400",
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      title: "Exchange app Dashboard",
      description:
        "A comprehensive dashboard for e-commerce businesses to track sales, inventory, and customer data with real-time analytics.",
      tags: ["React", "TypeScript", "Node.js", "MongoDB", "Chart.js"],
      image: "/exchange-app.png?height=400&width=400",
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered application that generates high-quality content for blogs, social media, and marketing materials.",
      tags: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel AI SDK"],
      image: "/Ai-content-gen.png?height=400&width=400",
      github: "https://github.com",
      demo: "https://example.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tags: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com",
      featured: false,
    },
    {
      title: "Weather Dashboard",
      description:
        "A beautiful weather dashboard that displays current conditions and forecasts with animated visualizations.",
      tags: ["JavaScript", "Weather API", "CSS", "Chart.js"],
      image: "/placeholder.svg?height=600&width=800",
      demo: "https://example.com",
      featured: false,
    },
    {
      title: "Recipe Finder",
      description:
        "A web application that helps users find recipes based on ingredients they have at home, with filtering options and saved favorites.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      image: "/placeholder.svg?height=600&width=800",
      github: "https://github.com",
      demo: "https://example.com",
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
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container">
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
            <span className="text-primary font-mono text-xl">03.</span>
            Some Things I've Built
            <div className="h-px bg-border flex-grow ml-4 opacity-50"></div>
          </motion.h2>

          <div className="space-y-32 ">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`relative md:flex md:flex-row md:gap-4 items-center ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {/* Project Image */}
                <div
                  className={`md:col-span-7 relative rounded-lg overflow-hidden group ${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="absolute inset-0 bg-primary/30 dark:bg-primary/20 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Project Content */}
                <div
                  className={`md:col-span-6 ${
                    index % 2 === 0
                      ? "md:order-1 md:text-left md:pr-8"
                      : "md:order-2 md:text-right md:pl-8"
                  } relative z-20 mt-4 md:mt-0`}
                >
                  <p className="text-primary font-mono text-sm mb-1">
                    Featured Project
                  </p>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

                  <div className="bg-card rounded-lg shadow-lg mb-4">
                    <p className="text-muted-foreground p-6">
                      {project.description}
                    </p>
                  </div>

                  <div
                    className={`flex flex-wrap gap-2 text-xs mb-6 ${
                      index % 2 === 0 ? "" : "md:justify-end"
                    }`}
                  >
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`flex gap-4 ${
                      index % 2 === 0 ? "" : "md:justify-end"
                    }`}
                  >
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="GitHub Repository"
                        >
                          <Github className="h-5 w-5" />
                        </Button>
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-center mt-32 mb-12"
          >
            Other Noteworthy Projects
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {otherProjects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-primary/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <ArrowUpRight className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              aria-label="GitHub Repository"
                            >
                              <Github className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {project.demo && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-muted px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
