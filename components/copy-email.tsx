"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded border border-border px-2 py-0.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
