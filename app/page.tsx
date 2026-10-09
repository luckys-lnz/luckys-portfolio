import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { caseStudies } from "@/content/work";
import { otherProjects } from "@/content/projects";
import { education, experience } from "@/content/experience";
import { siteConfig } from "@/lib/site";

const link =
  "underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-primary hover:text-primary";

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-6 scroll-mt-20 text-lg font-semibold">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-5 sm:px-6">
      <section className="pt-16 pb-4 sm:pt-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Lucky Archibong
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">Software engineer</p>

        <div className="mt-8 space-y-4 leading-7">
          <p>
            I build the backend-heavy parts of web products: bookings,
            payments, background jobs, and the database rules that keep them
            correct.
          </p>
          <p>
            Right now that&apos;s{" "}
            <Link href="/work/sikakoraa" className={link}>
              Sikakoraa
            </Link>
            , a service marketplace in Kenya where customers book local
            professionals and pay a deposit by mobile money. Before that I did
            contract work for jobmatch and Offside, and worked at Motito and
            TheDevBuild.
          </p>
          <p>
            I mostly write TypeScript, Python and SQL, usually with Next.js,
            Node.js and PostgreSQL.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a href={`mailto:${siteConfig.email}`} className={link}>
              Email
            </a>
          </li>
          <li>
            <a href={siteConfig.socials.github} className={link} rel="me">
              GitHub
            </a>
          </li>
          <li>
            <a href={siteConfig.socials.linkedin} className={link} rel="me">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={siteConfig.socials.twitter} className={link} rel="me">
              X
            </a>
          </li>
          <li>
            <a href={siteConfig.resume} className={link}>
              Resume (PDF)
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-20">
        <SectionHeading id="work">Work</SectionHeading>
        <ul className="divide-y divide-border border-y border-border">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group block py-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold group-hover:text-primary">
                    {study.title}
                  </h3>
                  <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                    {study.year}
                  </span>
                </div>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {study.summary}
                </p>
                <p className="mt-3 text-sm text-primary">
                  Read how it works{" "}
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionHeading id="projects">Other projects</SectionHeading>
        <ul className="space-y-5">
          {otherProjects.map((project) => (
            <li key={project.title} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} self-start font-medium`}
              >
                {project.title}
              </a>
              <div>
                <p className="leading-7 text-muted-foreground">
                  {project.description}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground/80">
                  {project.stack.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionHeading id="experience">Experience</SectionHeading>
        <ol className="space-y-10">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-semibold">
                  {job.role},{" "}
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {job.type && `${job.type} · `}
                  {job.dates}
                </span>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-7 text-muted-foreground marker:text-border">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHeading id="education">Education</SectionHeading>
        <ul className="space-y-4">
          {education.map((school) => (
            <li
              key={school.name}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <p>
                <span className="font-semibold">{school.name}</span>
                <span className="text-muted-foreground">, {school.course}</span>
              </p>
              {school.dates && (
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {school.dates}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionHeading id="contact">Contact</SectionHeading>
        <p className="leading-7">
          Email is the best way to reach me. I read everything and reply
          within a couple of days.
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-3">
          <a href={`mailto:${siteConfig.email}`} className={`${link} font-medium`}>
            {siteConfig.email}
          </a>
          <CopyEmail email={siteConfig.email} />
        </p>
      </section>
    </main>
  );
}
