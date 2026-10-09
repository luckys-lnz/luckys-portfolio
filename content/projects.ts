export type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
};

export const otherProjects: Project[] = [
  {
    title: "Kunanyesha",
    description:
      "Weekly county-level weather reports for all 47 Kenyan counties, generated from GFS forecast data with ward-level maps. Team project with deantosh.",
    stack: ["Next.js", "FastAPI", "Supabase", "GeoPandas"],
    href: "https://kunanyesha.archomak.com/",
  },
  {
    title: "Offside",
    description:
      "Website for a product that lets players book pitches and organise their team for a match.",
    stack: ["Webflow", "JavaScript"],
    href: "https://offside.soccer/",
  },
  {
    title: "Web crawler",
    description:
      "Multithreaded crawler with Redis deduplication, libxml2 parsing and Postgres or disk storage.",
    stack: ["C", "Python", "Redis", "PostgreSQL"],
    href: "https://github.com/luckys-lnz/web-scraper/tree/main/web-scraper",
  },
  {
    title: "LuDa chat",
    description: "Real-time chat rooms over WebSockets.",
    stack: ["Node.js", "WebSocket", "PostgreSQL", "Redis"],
    href: "https://github.com/luckys-lnz/LuDa_chat_app_v1",
  },
  {
    title: "SavePals",
    description:
      "Group savings: friends set a shared goal, track progress and manage contributions.",
    stack: ["Python", "Flask", "PostgreSQL", "Redis"],
    href: "https://github.com/luckys-lnz/SavePals",
  },
  {
    title: "AirBnB clone",
    description: "Listings, auth and booking. Built at ALX.",
    stack: ["Python", "Flask", "MySQL"],
    href: "https://github.com/luckys-lnz/AirBnB_clone_v4",
  },
  {
    title: "Neovim config",
    description: "The editor setup I use every day: LSP, completion, Treesitter, Git.",
    stack: ["Lua"],
    href: "https://github.com/luckys-lnz/nvim",
  },
];
