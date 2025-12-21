"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  const tabsRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [scrollPositionIndex, setScrollPositionIndex] = useState(0);

  // Check scroll position and update progress
  useEffect(() => {
    const checkScroll = () => {
      if (!tabsRef.current) return;
      const tabsElement = tabsRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = tabsElement;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // Calculate which dot should be highlighted based on scroll position
      if (maxScroll > 0) {
        // Get all button elements
        const buttons = tabsElement.querySelectorAll("button");
        if (buttons.length > 1) {
          // Find which button is closest to the center of the viewport
          const viewportCenter = scrollLeft + clientWidth / 2;
          let closestIndex = 0;
          let minDistance = Infinity;

          buttons.forEach((button, index) => {
            const buttonLeft = button.offsetLeft;
            const buttonCenter = buttonLeft + button.offsetWidth / 2;
            const distance = Math.abs(viewportCenter - buttonCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          setScrollPositionIndex(closestIndex);
        } else {
          setScrollPositionIndex(0);
        }
      } else {
        setScrollPositionIndex(0);
      }
    };

    const tabsElement = tabsRef.current;
    if (tabsElement) {
      checkScroll();
      tabsElement.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }

    return () => {
      if (tabsElement) {
        tabsElement.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [activeTab]);

  // Auto-scroll animation when section first comes into view
  useEffect(() => {
    if (isInView && !hasAutoScrolled && tabsRef.current) {
      const tabsElement = tabsRef.current;
      const { scrollWidth, clientWidth } = tabsElement;
      const maxScroll = scrollWidth - clientWidth;

      // Only auto-scroll if there's content to scroll
      if (maxScroll > 0) {
        // Wait a bit for the section to be visible, then scroll
        const timer = setTimeout(() => {
          tabsElement.scrollTo({
            left: maxScroll * 0.3, // Scroll to 30% of max scroll
            behavior: "smooth",
          });

          // Scroll back to start after a delay
          setTimeout(() => {
            tabsElement.scrollTo({
              left: 0,
              behavior: "smooth",
            });
            setHasAutoScrolled(true);
          }, 1500);
        }, 800);

        return () => clearTimeout(timer);
      } else {
        setHasAutoScrolled(true);
      }
    }
  }, [isInView, hasAutoScrolled]);

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
            {/* Company tabs with scroll indicator */}
            <div className="relative md:w-64">
              {/* Scrollable tabs container */}
              <div
                ref={tabsRef}
                className="md:border-l border-border flex md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide scroll-smooth relative"
              >
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

              {/* Fancy horizontal scroll indicator bar */}
              <div className="mt-4 md:hidden">
                <div className="relative h-1.5 bg-border/20 rounded-full overflow-hidden">
                  {/* Progress bar */}
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full"
                    style={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    style={{ left: `${scrollProgress - 33}%` }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                {/* Scroll dots indicator */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {experiences.map((_, index) => {
                    // Determine if this dot should be highlighted
                    const isActiveTab = index === activeTab;
                    const isScrollPosition = index === scrollPositionIndex;
                    const isBoth = isActiveTab && isScrollPosition;
                    const shouldHighlight = isActiveTab || isScrollPosition;
                    
                    // Calculate size based on scroll progress and active state
                    const baseSize = 1.5; // 6px (w-1.5)
                    const maxSize = 8; // 32px (w-8)
                    const progressFactor = scrollProgress / 100;
                    
                    // Size calculation: active tab or scroll position gets larger size
                    let dotWidth = baseSize;
                    let dotScale = 1;
                    
                    if (isBoth) {
                      // When both active tab and scroll position match, make it largest
                      dotWidth = maxSize;
                      dotScale = 1.4;
                    } else if (isActiveTab) {
                      // Active tab always gets large size
                      dotWidth = maxSize;
                      dotScale = 1.3;
                    } else if (isScrollPosition) {
                      // Scroll position dot grows based on scroll progress
                      // The further you scroll, the larger it gets
                      dotWidth = baseSize + (maxSize - baseSize) * progressFactor;
                      dotScale = 1 + (0.3 * progressFactor);
                    }

                    return (
                      <motion.div
                        key={index}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          shouldHighlight ? "bg-primary" : "bg-border/40"
                        )}
                        style={{
                          width: `${dotWidth * 4}px`, // Convert to px (1 = 4px in Tailwind)
                        }}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{
                          scale: dotScale,
                          opacity: shouldHighlight ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    );
                  })}
                </div>
              </div>
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
