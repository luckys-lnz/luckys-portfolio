# luckyarchibong.vercel.app

My personal site: a short intro, case studies of three projects, other work, experience and contact.

The case studies are the point of the site. Each one explains how a project works, with code taken from its repository: how [Sikakoraa](https://luckyarchibong.vercel.app/work/sikakoraa) makes sure a payment is applied exactly once, how [Task Master](https://luckyarchibong.vercel.app/work/task-master) stopped recurring tasks from duplicating themselves, and how [Forest](https://luckyarchibong.vercel.app/work/forest) ranks a dinner for two people.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; run it before pushing
```

Needs Node 18.18 or later. There are no environment variables.

## Where things are

```
content/                 everything you read on the site
  work.ts                the list of case studies and their types
  case-studies/*.ts      one file per case study
  projects.ts            "Other projects"
  experience.ts          experience and education
lib/site.ts              name, URL, email, resume path, social links
app/page.tsx             home page
app/work/[slug]/         case study pages, plus a share image for each
components/code-block.tsx  syntax highlighting
public/docs/LA.pdf       resume
```

Text lives in `content/` as typed data, separate from the pages. Changing a job or a project is a data edit, and TypeScript catches a missing field.

## Adding a case study

1. Create `content/case-studies/<slug>.ts` exporting a `CaseStudy`. Use `sikakoraa.ts` as a reference.
2. Add it to the `caseStudies` array in `content/work.ts`.
3. Put the screenshot in `public/` and set its real width and height.

That's all. The page, its share image, its sitemap entry and its link from the home page come from that array.

A section's `body` is a list of blocks:

```ts
"A paragraph. `Backticks` become inline code.",
{ list: ["A bullet", "Another bullet"] },
{ code: "select 1;", lang: "sql", file: "path/shown/above/the/block.sql" },
```

Code is highlighted with [Shiki](https://shiki.style) when the site builds, so the browser gets plain HTML with no highlighting JavaScript. Snippets are trimmed from the real files, with `...` where lines were removed. Keep them that way: if a snippet doesn't match its file, it shouldn't be on the page.

## How it's built

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.
- Every page is static and rendered on the server. The only client-side JavaScript is the theme toggle and the "Copy" email button.
- `app/sitemap.ts`, `app/robots.ts` and `app/manifest.ts` generate those files from the same data as the pages, so new case studies show up in the sitemap automatically.
- Share images are generated at build time by `lib/og.tsx`: one for the site and one per case study.
- Structured data (`Person`, `WebSite`, `ProfilePage`, and `CreativeWork` per case study) is in `app/layout.tsx` and the case study page.

Deployed on Vercel from `master`.

## Reusing this

There's no licence file, so the code isn't licensed for reuse yet. The writing, resume and screenshots are mine and aren't for reuse either way. If you want to borrow something, open an issue and ask.
