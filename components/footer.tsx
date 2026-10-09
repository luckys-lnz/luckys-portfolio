import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
          <a
            href="https://github.com/luckys-lnz/luckys-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Source
          </a>
        </p>
        <SocialLinks className="-ml-2.5 sm:ml-0 sm:-mr-2.5" />
      </div>
    </footer>
  );
}
