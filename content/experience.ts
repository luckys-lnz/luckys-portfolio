// Titles and dates follow LinkedIn; bullets use wording from LinkedIn or the resume.

export type Job = {
  role: string;
  company: string;
  url?: string;
  type?: string;
  dates: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Founder",
    company: "Archomak",
    url: "https://archomak.com",
    dates: "Apr 2025 to now",
    points: [
      "Evaluated payment providers for partial-escrow requirements and Kenyan market support.",
      "Implemented multi-role accounts, with rules preventing businesses from booking their own services.",
    ],
  },
  {
    role: "Web Developer",
    company: "jobmatch",
    type: "Contract",
    dates: "Sep 2024 to Apr 2025",
    points: ["Built and improved user-facing features for a job matching platform."],
  },
  {
    role: "Web Developer",
    company: "Offside",
    url: "https://offside.soccer/",
    type: "Contract",
    dates: "May 2024 to Aug 2024",
    points: [
      "Designed and built a responsive marketing website for a Canadian company, using Webflow with custom frontend work.",
    ],
  },
  {
    role: "Web Developer",
    company: "Motito",
    url: "https://motito.co",
    type: "Part-time",
    dates: "Aug 2021 to Mar 2022",
    points: [
      "Increased the Lighthouse performance score by 45% through image optimisation, smaller bundles and lazy loading.",
      "Built operational dashboards with JavaScript, SQL, BigQuery and Retool.",
    ],
  },
  {
    role: "Web Developer and UI/UX",
    company: "TheDevBuild",
    url: "https://www.thedevbuild.com",
    dates: "Dec 2020 to Oct 2021",
    points: [
      "Designed product interfaces in Figma and Adobe XD.",
      "Turned designs into responsive, interactive web pages.",
    ],
  },
];

export type School = {
  name: string;
  course: string;
  dates?: string;
};

export const education: School[] = [
  { name: "ALX", course: "Software Engineering", dates: "Feb 2024 to Feb 2025" },
  { name: "Accra Institute of Technology", course: "BSc Computer Science" },
];
