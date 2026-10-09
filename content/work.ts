// Case studies. Text supports `inline code` with backticks.

import { sikakoraa } from "@/content/case-studies/sikakoraa";
import { taskMaster } from "@/content/case-studies/task-master";
import { forest } from "@/content/case-studies/forest";

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  live?: string;
  repo?: string;
  image: { src: string; width: number; height: number };
  sections: { heading: string; body: Block[] }[];
};

export type Block =
  | string
  | { list: string[] }
  | { code: string; lang: "sql" | "ts" | "text"; file?: string };

export const caseStudies: CaseStudy[] = [
  sikakoraa,
  taskMaster,
  forest,
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
