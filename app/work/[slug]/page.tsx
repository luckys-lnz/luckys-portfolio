import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Inline } from "@/components/inline";
import { CodeBlock } from "@/components/code-block";
import { caseStudies, getCaseStudy } from "@/content/work";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const path = `/work/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${study.title} | ${siteConfig.name}`,
      description: study.summary,
    },
    twitter: {
      title: `${study.title} | ${siteConfig.name}`,
      description: study.summary,
    },
  };
}

const link =
  "underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-primary hover:text-primary";

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: `${siteConfig.url}/work/${study.slug}`,
    image: `${siteConfig.url}${study.image.src}`,
    author: { "@id": `${siteConfig.url}/#person` },
    keywords: study.stack.join(", "),
    ...(study.live && { sameAs: study.live }),
  };

  return (
    <main className="mx-auto max-w-2xl px-5 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-12 sm:pt-16">
        <Link
          href="/#work"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; All work
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {study.summary}
        </p>

        <dl className="mt-8 grid grid-cols-[5rem_1fr] gap-x-4 gap-y-2 border-y border-border py-5 text-sm">
          <dt className="text-muted-foreground">Year</dt>
          <dd>{study.year}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd>{study.role}</dd>
          <dt className="text-muted-foreground">Stack</dt>
          <dd>{study.stack.join(", ")}</dd>
          {(study.live || study.repo) && (
            <>
              <dt className="text-muted-foreground">Links</dt>
              <dd className="flex flex-wrap gap-x-4">
                {study.live && (
                  <a href={study.live} target="_blank" rel="noopener noreferrer" className={link}>
                    {new URL(study.live).hostname}
                  </a>
                )}
                {study.repo && (
                  <a href={study.repo} target="_blank" rel="noopener noreferrer" className={link}>
                    Source
                  </a>
                )}
              </dd>
            </>
          )}
        </dl>

        <figure className="mt-10">
          <Image
            src={study.image.src}
            width={study.image.width}
            height={study.image.height}
            alt={`Screenshot of ${study.title}`}
            sizes="(min-width: 672px) 672px, 100vw"
            priority
            className="rounded-md border border-border"
          />
        </figure>

        <div className="mt-12 space-y-12">
          {study.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-5 leading-7 text-foreground/85">
                {section.body.map((block, i) =>
                  typeof block === "string" ? (
                    <p key={i}>
                      <Inline text={block} />
                    </p>
                  ) : "list" in block ? (
                    <ul key={i} className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
                      {block.list.map((item) => (
                        <li key={item}>
                          <Inline text={item} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <CodeBlock key={i} code={block.code} lang={block.lang} file={block.file} />
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </article>

      {next.slug !== study.slug && (
        <nav className="mt-16 border-t border-border pt-6" aria-label="Next case study">
          <p className="text-sm text-muted-foreground">Next</p>
          <Link href={`/work/${next.slug}`} className="group mt-1 block">
            <span className="font-semibold group-hover:text-primary">
              {next.title} &rarr;
            </span>
            <span className="mt-1 block text-muted-foreground">{next.summary}</span>
          </Link>
        </nav>
      )}
    </main>
  );
}
