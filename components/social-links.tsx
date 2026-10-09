import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export const socialLinks = [
  { label: "GitHub", href: siteConfig.socials.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: Linkedin },
  { label: "X (Twitter)", href: siteConfig.socials.twitter, icon: XIcon },
];

export function SocialLinks({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`Lucky Archibong on ${label}`}
            title={label}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              itemClassName
            )}
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
