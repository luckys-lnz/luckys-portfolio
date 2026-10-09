import { codeToHtml } from "shiki";

// Highlighted at build time; ships no JavaScript.
export async function CodeBlock({
  code,
  lang,
  file,
}: {
  code: string;
  lang: string;
  file?: string;
}) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  return (
    <figure className="code-block -mx-5 overflow-hidden border-y border-border bg-muted/40 sm:mx-0 sm:rounded-md sm:border">
      {file && (
        <figcaption className="border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
          {file}
        </figcaption>
      )}
      <div
        className="overflow-x-auto text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
