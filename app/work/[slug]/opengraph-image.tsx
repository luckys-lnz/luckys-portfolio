import { ogSize, renderOg } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/content/work";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const study = getCaseStudy((await params).slug);
  return renderOg({
    title: study?.title ?? "Case study",
    subtitle: study?.summary ?? "",
  });
}
